/* 
 * 抓取信息
 * 存储信息
 */

message=function(_id,_sender,_receiver,_time,_type){
    this.status=0;
    this.id=_id;
    this.sender=_sender;
    this.receiver=_receiver;
    this.type=_type;
    this.time=_time;
    this.title=undefined;
    this.content=undefined;
    var self=this;
    ajaxUrlManager.push('http://www.cc98.org/messanger.asp?action=read&id='
        +_id,"GET","",function(HTML){
            try{
                var regex_title=/\>消息标题：([^\n]*)<\/b/;
                self.title=regex_title.exec(HTML)[1];
                var regex_text=/\<span\sid="ubbcode1"\s\>([^]*)<\/span\>/;
                self.content=regex_text.exec(HTML)[1];
                self.status=1;
                HTML=null;
            }catch(e){
                console.log(e.message);
            }
        });
    ajaxUrlManager.exe();
};

function contentFetch(values){
    
}
function messageFetch(){
    ajaxUrlManager.push("http://www.cc98.org/usersms.asp?action=inbox","GET","",function(HTML){
        //var tmp=requestdoc.match(/\<script[^\>]*\>openScript.*?&id=([^&]*)'.*?\<\/script\>/);
        try{
            var receiver=/<b>([^/]*)?<\/b>/g.exec(HTML)[1];
        }catch(e){
            return;
        }
        var regex=/font-weight:bold.*?&id=([^&\n\s\>]*)&sender=([^&\n\s'\>']*)".*?>([^&\n\<]*)/g;
        var tmp;
        while((tmp=regex.exec(HTML))!=null){
            var tmpMessage=new message(tmp[1],tmp[2],receiver,tmp[3],"in");
            messagePool.push(tmpMessage);
            console.log(tmpMessage.id,tmpMessage.sender,tmpMessage.receiver,
            tmpMessage.type,tmpMessage.time,tmpMessage.title,tmpMessage.content);
        }
        HTML=null;
        //console.log("try produce");
    });
    ajaxUrlManager.exe();
}

function messageDispatch(){
    while(true){
        if(messagePool.empty()) return;
        var message=messagePool.shift();
        if(message.status==1){              //只有message构造完成时才能将其存入数据库
    //            chrome.extension.sendRequest({
    //                task: "message_store",
    //                values: [message.id, message.type,0, message.title,
    //                message.receiver,  message.sender , message.time,message.content]
    //            });
            storeMessage(message);
        }else{
            messagePool.push(message);
            break;
        }
    }
}

function storeMessage(message){
    db.transaction(function (tx) {
        tx.executeSql('INSERT INTO MESSAGES (webid, type, checked, title, host, target, time, content) VALUES (?,?,?,?,?,?,?,?)',
        [parseInt(message.id), message.type,0, encodeURIComponent(message.title),
            encodeURIComponent(message.receiver),message.sender , message.time,encodeURIComponent(message.content)],
        function(tx,r){
            //saveSetting("uncheckedCount",parseInt(getSetting("uncheckedCount",0))+r.rowsAffected);
            updateBadgeText();
            messageIndicate(message.type);
            console.log("Record "+message.id+" store.");
            console.log([typeof parseInt(message.id),typeof message.type,typeof 0,typeof encodeURIComponent(message.title),
            typeof encodeURIComponent(message.receiver),typeof message.sender ,typeof message.time,typeof encodeURIComponent(message.content)]);
        },function(tx,e){
            //show_notification('images/Talk48.png',"插入失败!",e.message);
            //messagePool.push(message);
            console.log([typeof parseInt(message.id),typeof message.type,typeof 0,typeof encodeURIComponent(message.title),
            typeof encodeURIComponent(message.receiver),typeof message.sender ,typeof message.time,typeof encodeURIComponent(message.content)]);
            console.log(e.message);
        });
    });
}


