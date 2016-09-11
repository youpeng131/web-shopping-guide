//全局变量
// var api = 'http://localhost:3000';
// var api = 'http://139.224.19.117:3000';
var api = 'http://www.shenmejie.com:3000'
var host = 'http://www.shenmejie.com';

var http = 'http://';
var https = 'https://';
var set_num_small = 10;
var set_num = 20;

if(getCookie('show_bottomtip')){
    $(".bottomtip").hide();
    $(".bottomtip").addClass("bottomtipclose");   
}


$(".bottomtip .close").on("click",function(){
    setCookie('show_bottomtip',true,100000);
    $(".bottomtip").hide();
    $(".bottomtip").toggleClass("bottomtipclose");
});


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

function clearAllCookie(){ 
    var keys=document.cookie.match(/[^ =;]+(?=\=)/g); 
    if (keys) { 
        for (var i = keys.length; i--;) 
            document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString() 
    }

    $('.topz .line2').css('width','200px');
    $('.topz .line2').html('');
    $('.topz .line2').hide();
    $('.topz .line3').show();
    $('.topz .line4').show();
} 

function checkCookie() {
    var user = getCookie("nick_name");
    if(user){
        $('.topz .line2').css('width','300px');
        $('.topz .line2').html('<a href="javascript:;">' + user + '</a><a href="javascript:clearAllCookie()">退出登录</a><a href="javascript:gotoMerchandise()">我的商铺</a>');
        $('.topz .line2').show();
        $('.topz .line3').hide();
        $('.topz .line4').hide();
    }
}

function checkCookieMoble(){
	var user = getCookie("nick_name");
    if(user){
    	$('.login.in').hide();
    }
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


function gotoMerchandise(){
    window.open(api);
}

//登录
function login(type){

	$.ajax({
         type: "POST",
         url: api + "/login?"+$('#login').serialize(),
         dataType: "json",
	     xhrFields: {
	         withCredentials: true
	     },
	     success: function(data){
            if(type){
	     	 window.location.href="/moble.html";
            }
            else{
             window.location.href="/";   
            }
         },
         error: function(data){
         	
         	data = eval('('+data.responseText+')');

         	alert(data.msg);
         }
     });

	return false;

}

//注册
function userCreate(type){

	var data = getFormJson('#userCreate');

    if(data.pwd != data.repassword){
        alert('密码不一致');
        return false;
    }

	$.ajax({
         type: "POST",
         url: api + "/user_create?"+$('#userCreate').serialize(),
         dataType: "json",
         xhrFields: {
             withCredentials: true
         },
	     success: function(data){
	     	if(type){
             window.location.href="/landedMoble.html";
            }
            else{
             window.location.href="/landed.html";   
            }
         },
         error: function(data){
            data = eval('('+data.responseText+')');

            alert(data.msg);
         }


     });

    return false;

}


//注册
function userEdit(type){

    var data = getFormJson('#userEdit');

    if(data.pwd != data.repassword){
        alert('密码不一致');
        return false;
    }

    $.ajax({
         type: "get",
         url: api + "/user_create?"+$('#userEdit').serialize(),
         dataType: "json",
         xhrFields: {
             withCredentials: true
         },
         success: function(data){
            if(type){
             window.location.href="/landedMoble.html";
            }
            else{
             window.location.href="/landed.html";   
            }
         },
         error: function(data){
            data = eval('('+data.responseText+')');

            alert(data.msg);
         }


     });

    return false;

}

//收藏
function collection_create(id){

    $.ajax({
         type: "POST",
         url: api + "/clientUser?commodity_id=" + id,
         dataType: "json",
         xhrFields: {
             withCredentials: true
         },
         success: function(data){

         },
         error: function(data){
            
            data = eval('('+data.responseText+')');

            alert(data.msg);
         }
     });

}


//更新阅读数
function add_read(id){

    $.ajax({
         type: "get",
         url: api + "/client_read/" + id,
         dataType: "json",
         xhrFields: {
             withCredentials: true
         },
         success: function(data){

         },
         error: function(data){
            
            data = eval('('+data.responseText+')');

            alert(data.msg);
         }
     });

}

//搜索
function search(){
    var val = $('#search_text').val();

    if(val=='请输入宝贝名') val=''

    window.location.href="/search.html?name="+val; 
}



$('.uploadImg').on('change', function () {
    var type = $(this).attr('upload-type');
    var file = $(this).get(0).files[0];
    var start = file.name.lastIndexOf('.') + 1;
    var suffix = file.name.substr(start);
    if (suffix !== 'jpeg' && suffix !== 'png' && suffix !== 'jpg') {
        alert('请上传图片文件！格式限制为 jpg/png/jpeg');
        return;
    }


// $.ajax({
//      type: "post",
//      url: api + "/upload?file="+file,
//      dataType: "json",
//      xhrFields: {
//          withCredentials: true
//      },
//      success: function(data){
//         console.log(data)
//      },
//      error: function(data){
        
//         data = eval('('+data.responseText+')');

//         alert(data.msg);
//      }
//  });

})



function create_merchant(){


    $.ajax({
         type: "POST",
         url: api + "/create_merchant?"+$('#create_merchant').serialize(),
         dataType: "json",
         xhrFields: {
             withCredentials: true
         },
         success: function(data){

         },
         error: function(data){
            data = eval('('+data.responseText+')');

            alert(data.msg);
         }


     });

    return false;
}


// 判断浏览器
  function mobile_device_detect(url) {
  var thisOS = navigator.platform;
  var os = new Array("iPhone", "iPod", "iPad", "android", "Nokia", "SymbianOS", "Symbian", "Windows Phone", "Phone", "Linux armv71", "MAUI", "UNTRUSTED/1.0", "Windows CE", "BlackBerry", "IEMobile");
  for (var i = 0; i < os.length; i++) {
  if (thisOS.match(os[i])) {
  window.location = url;
}
}
  //因为相当部分的手机系统不知道信息,这里是做临时性特殊辨认
  if (navigator.platform.indexOf('iPad') != -1) {
  window.location = url;
}
  //做这一部分是因为Android手机的内核也是Linux
  //但是navigator.platform显示信息不尽相同情况繁多,因此从浏览器下手，即用navigator.appVersion信息做判断
  var check = navigator.appVersion;
  if (check.match(/linux/i)) {
  //X11是UC浏览器的平台 ，如果有其他特殊浏览器也可以附加上条件
  if (check.match(/mobile/i) || check.match(/X11/i)) {
  window.location = url;
}
}
  //类in_array函数
  Array.prototype.in_array = function (e) {
  for (i = 0; i
  < this.length; i++) {
  if (this[i] == e)
  return true;
}
  return false;
}
}
















