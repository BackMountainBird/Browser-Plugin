/*
 *用于同时发起多个请求
 *汪航勋 YQ.Dorm 2011/5
 */

function $AjaxUrl(url,method,data){
    if(!url) return function(){};
    function createXmlHttp(){
        var http_request;
        if(window.XMLHttpRequest){
            http_request =new XMLHttpRequest();
        }else if(window.ActiveXObject){
            try{
                http_request = new ActiveXObject("Msxml2.XMLHTTP");
            }catch(e){
                http_request =new  ActiveXObject("Microsoft.XMLHTTP");
            }
        }else {
            http_request = null;
        }
        return  http_request;
    }

    function printInnerHtmlOnMain(tempCallback){
        //var method="GET";
        var xmlhttp = createXmlHttp();
        if (xmlhttp == null) return;
        xmlhttp.onreadystatechange = function(){
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    tempCallback(xmlhttp.responseText);
                }
            }
        };
        xmlhttp.open(method, url, true);
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        xmlhttp.setRequestHeader("If-Modified-Since","0");
        xmlhttp.send(data);
    }
    return printInnerHtmlOnMain;
}

function $(elementId){
    return document.getElementById?document.getElementById(elementId):eval(elementId);
}
ajaxUrlManager = function(){
    var arr=new Array();
    function exe(){
        if(arr.length>0) arr.shift()();
    }
    function push(url,method,data,func){
        arr.push(function(){
            $AjaxUrl(url,method,data)(function(){
                func.apply(this,arguments);
                exe();
            });
        });
    }
    return {
        exe:exe,
        push:push
    }
}();