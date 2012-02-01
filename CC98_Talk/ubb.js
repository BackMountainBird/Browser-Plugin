/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var host="http://www.cc98.org/";
function parseubb(str){
	str = str.replace(/\[color=(.[^\[\"\'\\\(\)\:\;]*)\](.*?)\[\/color\]/gi,"<span style=\"color:$1;\">$2</span>");
	str = str.replace(/\[user\](.[^\[]*)\[\/user\]/gi, "<span onclick=\"window.location.href='dispuser.asp?name=$1'\" style=\"cursor:pointer;\">$1</span>");
	str = str.replace(/\[quote=1\]([\s\S]*?)\[\/quote\]\n*/gi,"<div><div class=\"quoteMaxHeightDiv\" style=\"margin:5px 0;background:#e4e8ef;border:1px solid #6595D6;overflow:auto; padding:5px;-webkit-border-radius:3px;\">$1</div></div>");
	str = str.replace(/\[quote=0\]([\s\S]*?)\[\/quote\]\n*/gi,"<div><div style=\"margin:5px 0;background:#e4e8ef;border:1px solid #6595D6;overflow:auto; padding:5px;-webkit-border-radius:3px;\">$1</div></div>");
	str = str.replace(/\[quote\]([\s\S]*?)\[\/quote\]\n*/gi,"<div><div style=\"margin:5px 0;background:#e4e8ef;border:1px solid #6595D6;overflow:auto; padding:5px;-webkit-border-radius:3px;\">$1</div></div>");
	str = str.replace(/\[quotex\]\[b\](.*?)\[\/b\]([\s\S]*?)\[\/quotex\]\n*/gi,"<div style=\"background:#e4e8ef;border:1px solid #6595D6;margin-bottom:10px;padding:5px;-webkit-border-radius:3px;\"><div style=\"margin-bottom:5px;\"><b>$1</b></div><div class=\"quoteMaxHeightDiv\" style=\"overflow:auto; padding-left:5px;\">$2</div></div>");
	str = str.replace(/\[i\](.*?)\[\/i\]/gi,"<i>$1</i>");
	str = str.replace(/\[u\](.*?)\[\/u\]/gi,"<u>$1</u>");
	str = str.replace(/\[color=(.[^\[\"\'\\\(\)\:\;]*)\](.*?)\[\/color\]/gi,"<span style=\"color:$1;\">$2</span>");
	str = str.replace(/\[del\](.*?)(\[\/del\])/gi,'<span style="text-decoration:line-through;">$1</span>');
	str = str.replace(/\[b\](.*?)(\[\/b\])/gi,"<b>$1</b>");
	str = str.replace(/\[em([0-9]+)\]/gi,"<img src=\"emot/simpleemot/emot$1.gif\" border=0 align=middle>");
	pattern=/\[UPLOAD=(gif|jpg|jpeg|bmp|png)([,]*)([01]*)\](http:\/\/(file\.cc98\.org|cc98file\.lifetoy\.org)\/.[^\[\'\"\:\(\)]*)(gif|jpg|jpeg|bmp|png)\[\/UPLOAD\]\n*/gi;
	str=str.replace(pattern,'<a href="$4$6" target="_blank" class="clickloadImage"  onclick="this.innerHTML=loadImg(this.href);this.onclick=function(){}; return false;"><img src="images/files/$6.gif" border=0>$4$6</a>');
	pattern=/\[UPLOAD=(.[^\[\'\"\:\(\)]*?)([,]*)([01]*)\](http:\/\/(file\.cc98\.org|cc98file\.lifetoy\.org)\/.[^\[\'\"\:\(\)]*)\[\/UPLOAD\]\n*/gi;
	str= str.replace(pattern,"<BR><IMG style=\"margin:15px 0;vertical-align:middle\" SRC=\"images/files/$1.gif\" border=0> <a style=\"border-bottom:1px dashed #ccc\" href=\"$4\">点击浏览该文件</a><br/>");
	switch(host){
		case "http://www.cc98.org/":
			break;
		case "http://cc98.lifetoy.org/":
			str = str.replace(/file.cc98.org/ig,"cc98file.lifetoy.org");
			break;
		default:
			break;
	}
	return str;
}
