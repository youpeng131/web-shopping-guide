//全局变量
var api = 'http://localhost';
var http = 'http://';
var https = 'https://';
var set_num_small = 10;
var set_num = 20;
checkCookie()
//设置cookie
function setCookie(cname, cvalue, exdays) {
    // var d = new Date();
    // d.setTime(d.getTime() + (exdays*24*60*60*1000));
    // var expires = "expires="+d.toUTCString();
    // document.cookie = cname + "=" + cvalue + "; " + expires;
    document.cookie = cname + "=" + cvalue + "; ";
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
     setCookie("username", 'a', 365);
}

function getCookie(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
	return unescape(arr[2]);
	else
	return null;
}

function getFormJson(form) {
	var o = {};
	var a = $(form).serializeArray();
	$.each(a, function () {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
				o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
}

function login(){

	var data = getFormJson('#login');

	$.ajax({
         type: "POST",
         url: api + "/login?"+$('#login').serialize(),
         data: data,
         dataType: "json",
         jsonp:'callback',
	     success: function(data){

         },
         error: function(data){

         }
     });


	function callback( data ){
    console.log( data );
}

	return false;

}


function userCreate(){

	var data = getFormJson('#userCreate');

	$.ajax({
         type: "POST",
         url: api + "/create_user",
         data: '{a:2,b:3}',
         dataType: "jsonp",
         jsonp:'callback',
	     success: function(data){
	     	
         },
         error: function(data){

         }


     });

}