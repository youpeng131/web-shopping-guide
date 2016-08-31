var page = 1;
var countPage = 0;

$(function(){

	get_ad(2);
	get_new();

})



//获取url参数
function GetRequest() {
  
  var url = location.search; //获取url中"?"符后的字串
   var theRequest = new Object();
   if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      strs = str.split("&");
      for(var i = 0; i < strs.length; i ++) {
         theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
      }
   }
   return theRequest;
}

//获取广告图片
function get_ad(addr) {

	$.ajax({
         type: "get",
         url: api + "/client_ab",
         data: {'filters': { 'type': 0, 'addr': addr }},
         dataType: "json",
	     xhrFields: {
	         withCredentials: true
	     },
	     success: function(data){

	     	create_ad(data.data);

         },
         error: function(data){
         	
         	data = eval('('+data.responseText+')');

         	alert(data.msg);
         }
     });

}

//生成广告
function create_ad(json){

	var li = '';
	var div = '';
	var html = '';

	$.each(json, function(index, item){
		// images/banner1.jpg
		if(index == 0){
			li += '<li data-target="#carousel-example-generic" data-slide-to="' +index+ '" class="active" style="margin-right: 3px"></li>';
			div += '<div class="item active"><img src="' + api + item.photo + '" alt="" style="height: 200px;width: 100%;"></div>';
		}
		else {
			li += '<li data-target="#carousel-example-generic" data-slide-to="' +index+ '" style="margin-right: 3px"></li>'
			div += '<div class="item"><img src="' + api + item.photo + '" alt="" style="height: 200px;width: 100%;"></div>';
		}
	});

	if(json.length){

		html = '<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">\
	        <ol class="carousel-indicators">\
	        '+li+'\
	        </ol>\
	        <div class="carousel-inner" role="listbox">\
	        '+div+'\
	        </div>\
	        <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">\
	          <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>\
	          <span class="sr-only">Previous</span>\
	        </a>\
	        <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">\
	          <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>\
	          <span class="sr-only">Next</span>\
	        </a>\
	      </div>'
	}



	$('#create_ad').append(html);

}



//获取最新
function get_new( order, sort){


	$.ajax({
         type: "get",
         url: api + "/client_ac",
         data: { filters: {"type":0,"status":1}, num: set_num_small, page: page },
         dataType: "json",
	     xhrFields: {
	         withCredentials: true
	     },
	     success: function(data){

	     	countPage = Math.ceil(data.count/set_num_small);
	    	create_new(data.data);

         },
         error: function(data){
         	
         	data = eval('('+data.responseText+')');

         	alert(data.msg);
         }
     });


}

//生成最新
function create_new(json){

	var li = '';

	$.each(json, function(index, item){
			li += '<li class="flag_out"><a target="_blank" href="' + http + item.alimama_url + '" onclick=add_read(' + item.id + ')><div class="pro_img"><img src="' + api + item.photo + '" alt="' + item.name + '"></div><div class="pro_info"><div class="tit_area"><strong class="pad10">' + item.name + '</strong></div><div class="attr"><span class="price">¥' + item.read_num + '</span><del></del></div><div class="attr"><span class="line">已售<font class="fc_index_orangeRed">' + item.read_num + '</font>件</span><span class="sales"></span><span class="">特卖商城</span></div></div></a><img src="" id="exposImg" style="display: none;"></li>';
	});


	$('#create_new').append(li);

	if(json.length){
		$('.show_create_new').show();
	}

}

//下一页
function next(){
	if (countPage > page){
		page = page+1;
		get_new('updateTime', 'desc');
	}
	else {
		$('#show_more').text('已经加载完全部内容');
	}

}















