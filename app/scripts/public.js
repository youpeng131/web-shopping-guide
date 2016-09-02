//全局变量
var api = 'http://localhost:3000';
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
        $('.topz .line2').css('width','200px');
        $('.topz .line2').html('<a href="/landedMoble.html">' + user + '</a><a href="javascript:clearAllCookie()">退出登录</a>');
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

















