/**
 * Created by luomengjieluo on 16/8/29.
 * description
 */
function getLength(str){
  return str.replace(/[^\x00-xff]/g,"xx").length;  //\x00-xff 此区间是单子节 ，除了此区间都是双字节。
}
function findStr(str,n){
  var tmp=0;
  for(var i=0;i<str.length;i++){
    if(str.charAt(i)==n){
      tmp++;
    }
  }
  return tmp;
}
window.onload=function(){
  var aInput=document.getElementsByTagName('input');
  var oName=aInput[0];
  var pwd=aInput[1];
  var pwd2=aInput[2];
  var oIphone=aInput[3];
  var dx=aInput[4];

  var aP=document.getElementsByTagName('p');
  var name_msg=aP[0];
  var dx_msg=aP[0];
  var pwd_msg=aP[0];
  var pwd2_msg=aP[0];
  var name_length=0;
  var send=document.getElementById('send'),

    times=60,
    timer=null;
  send.onclick=function(){
    // 计时开始
    timer = setInterval(djs,1000);

    $.ajax({
      type: "get",
      url: api + "/login?phone="+$('#phone').val(),
      dataType: "json",
     success: function(data){
     },
     error: function(data){
      data = eval('('+data.responseText+')');

      alert(data.msg);
    }


  });

    
  }
  function djs(){
    send.value = times+"秒后重试";
    send.setAttribute('disabled','disabled');
    send.style.background='#ccc';
    send.style.border='1px solid #ccc';
    times--;
    if(times <= 0){
      send.value = "发送验证码";
      send.removeAttribute('disabled');
      send.style.background='#79b235';
      send.style.border='1px solid #79b235';
      times = 60;
      clearInterval(timer);
    }
  }


  //用户名检测
  oName.onfocus=function(){
    name_msg.style.display='block';
    oName.removeAttribute("placeholder");
    oName.style.border='1px solid #fff';
  }

  oName.onblur=function(){
    if(!this.value){
      name_msg.innerHTML='<i>用户名不能为空</i>';
      oName.style.border='1px solid red';
    }
    else{
      oName.style.border='1px solid #fff';
    }
  }

  oIphone.onfocus=function(){
    name_msg.style.display='block';
    oIphone.removeAttribute("placeholder");
    oIphone.style.border='1px solid #fff';
  }

  oIphone.onblur=function(){
    // 含有非法字符 ，不能为空 ，长度少于5个字符 ，长度大于25个字符
    var tel = /^1[3|4|5|7|8][0-9]\d{8}$/;
    if(!tel.test(this.value)){
      name_msg.innerHTML='<i>手机号不正确</i>';
      oIphone.style.border='1px solid red';
    }
    else{
      oIphone.style.border='1px solid #fff';
    }
  }

  //短信验证码检测

  dx.onfocus=function(){
    dx_msg.style.display='block';
    dx.removeAttribute("placeholder");
    dx.style.border='1px solid #fff';
  }

  //密码检测
  pwd.onfocus=function(){
    pwd_msg.style.display='block';
    pwd.removeAttribute("placeholder");
    pwd.style.border='1px solid #fff';
  }
  pwd.onblur=function(){
    var m=findStr(pwd.value,pwd.value[0]);
    var re_n=/[^\d]/g;
    var re_t=/[^a-zA-Z]/g;
    if(this.value==""){
      pwd_msg.innerHTML='<i>密码不可为空</i>';
      pwd.style.border='1px solid red';
    }else if(m==this.value.length){
      pwd_msg.innerHTML='<i>密码不可使用相同的字符</i>';
      pwd.style.border='1px solid red';
    }else if(this.value.length<6 || this.value.length>16){
      pwd_msg.innerHTML='<i>密码长度应为6到16个字符</i>';
      pwd.style.border='1px solid red';
    }else if(!re_n.test(this.value)){
      pwd_msg.innerHTML='<i>密码不能全为数字</i>';
      pwd.style.border='1px solid red';
    }else if(!re_t.test(this.value)){
      pwd_msg.innerHTML='<i>密码不能全为字母</i>';
      pwd.style.border='1px solid red';
    }else{
      pwd.style.border='1px solid #fff';
    }
  }

  //确认密码
  pwd2.onblur=function(){
    if(this.value!=pwd.value){
      pwd2_msg.innerHTML='<i></i>两次密码输入到不一致';
      pwd.style.border='1px solid red';
    }else if(this.value==""){
      pwd2_msg.innerHTML='<i></i>请输入密码';
      pwd.style.border='1px solid red';
    }else{
      pwd2.style.border='1px solid #fff';
    }
  }

}







































