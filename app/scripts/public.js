//全局变量
var api = 'http://localhost';
var http = 'http://';
var https = 'https://';
var set_num_small = 10;
var set_num = 20;

//设置cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

//获取cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}
//清除cookie  
function clearCookie(name) {  
    setCookie(name, "", -1);  
}  
function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}

function getCookie(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
	return unescape(arr[2]);
	else
	return null;
}

function login(){

	var data = $('#login').serialize();

	$.ajax({
         type: "POST",
         url: api + "/login",
         data: data,
         dataType: "json",
	     success: function(data){

         },
         error: function(data){

         }
     });

	return false;

}


function userCreate(){

	var data = $('#userCreate').serialize() 

	$.ajax({
         type: "POST",
         url: api + "/create_user",
         data: data,
         dataType: "jsonp",
         jsonp:'callback',
	     success: function(data){
	     	
         },
         error: function(data){

         }


     });

}