/**
 * Created by luomengjieluo on 16/8/30.
 * description
 */
 $(function(){
  var timer;
  var times = 60;
  //登录输入框效果
  $('.form_text_ipt input').focus(function(){
    $(this).parent().css({
      'box-shadow':'0 0 3px #bbb',
    });
  });
  $('.form_text_ipt input').blur(function(){
    $(this).parent().css({
      'box-shadow':'none',
    });
    //$(this).parent().next().hide();
  });


  $('#send').click(function(){
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

  })

  function djs(){
    var send = $('#send');
    send.val(times+"秒后重试");
    send.attr('disabled','disabled');
    send.css({
      'background':'#ccc',
      'border':'1px solid #ccc'
    });
    times--;
    if(times <= 0){
      send.val ("发送验证码");
      send.removeAttr('disabled');
      send.css({
        'background':'#79b235',
        'border':'1px solid #79b235'
      });
      times = 60;
      clearInterval(timer);
    }
  }

  //表单验证
  $('.form_text_ipt input').bind('input propertychange',function(){
    if($(this).val()==""){
      $(this).css({
        'color':'red',
      });
      $(this).parent().css({
        'border':'solid 1px red',
      });
      //$(this).parent().next().find('span').html('helow');
      $(this).parent().next().show();
    }else{
      $(this).css({
        'color':'#ccc',
      });
      $(this).parent().css({
        'border':'solid 1px #ccc',
      });
      $(this).parent().next().hide();
    }
  });
});
