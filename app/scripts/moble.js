$(function(){

	checkCookieMoble();

	get_type();
	get_ad(0);
	get_ac(4, 1);
	get_hot(6, 1, 'read_num', 'desc');
	get_new(10, 1, 'updateTime', 'desc');


})


//获取类型
function get_type(){

	 $.ajax({
         type: "get",
         url: api + "/client_type",
         dataType: "json",
         xhrFields: {
             withCredentials: true
         },
         success: function(data){
         	var json = [];

			var count = 0;

			$.each(data.data, function(index, item){

				if( index > count || index === 0){
					var obj = item;

					if (item.children) {
						var map = type_count(data.data, index+1, item.children);
						obj.list = map;
						count = index + item.children;
					}
					json.push(obj);	
				}

		    });

		    create_type(json);
         },
         error: function(data){
            
            data = eval('('+data.responseText+')');

            alert(data.msg);
         }
     });

}

//生成类型
function create_type(json){

	var html = '';

	var count = 0;

	$.each(json, function(index, item){


		if(item.list){


	        $.each(item.list, function(index, _item){

	        	if(count == 7){

	        		html += '<li class="all_o" data-url="/m/category/category" id="type_move"><span></span><strong>更多</strong></li>'

	        		

	        	}

	        	html += '<li id="' +_item.id + '" class=""><span><a href= "/mobleList.html?type=' + _item.id + '"><img src="' + api + _item.icon + '" width="50"height="50"/></a></span><strong>' +_item.name + '</strong></li>'
	        	count ++;

	        });


        }


        if(index == json.length-1){

	        html += '<li class="all_o" data-url="/m/category/category" id="type_hide"><span></span><strong>收起</strong></li>'

	        
        }


	})


    $('#create_type').append(html);

    $('#type_move').bind('click', function(){
		$('#create_type').css('height','auto');
		$(this).hide();

	});

	$('#type_hide').bind('click', function(){
		$('#create_type').css('height','174px');
		$('#type_move').show();

	});

}

 

//格式化类型
function type_count(array, min_index ,count){

	var json = [];
	array = array.slice(min_index,count+min_index);

	var count = 0;

	$.each(array, function(index, item){
		if( index > count || index === 0){
			var obj = item;

			if (item.children) {
				var map = type_count(array, index+1 ,item.children);
				obj.list = map;
				count = index + item.children;
			}
			json.push(obj);	
		}
	})

	return json;

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


//获取抢购列表
function get_ac(num, page){

	$.ajax({
         type: "get",
         url: api + "/client_ac",
         data: { filters: {"type":0,"status":1}, num: num, page: page },
         dataType: "json",
	     xhrFields: {
	         withCredentials: true
	     },
	     success: function(data){

	     	create_ac(data.data);

         },
         error: function(data){
         	
         	data = eval('('+data.responseText+')');

         	alert(data.msg);
         }
     });


}

//生成抢购列表
function create_ac(json){

	var dl = '';

	$.each(json, function(index, item){

		if(index < 2){
			dl = '<a href="' + http + item.alimama_url + '" class="saleDeal" target="" onclick=add_read(' + item.id + ')><dl class="rec_item"><dt class="tit">' + item.name + '</dt><dd class="txt">' + item.title + '</dd><dd class="img"><img src="' + api + item.photo + '" width="45" height="45" alt=""></dd></dl></a>';
		}
		else {
			dl = '<a href="' + http + item.alimama_url + '" class="saleDeal" target="" onclick=add_read(' + item.id + ')><dl class="rec_item bottom-style"><dt class="tit">' + item.name + '</dt><dd class="txt">' + item.title + '</dd><dd class="img"><img src="' + api + item.photo + '" width="45" height="45" alt=""></dd></dl></a>';			
		}


	});

	$('#create_ac').append(dl);

	if(json.length){
		$('.show_create_ac').show();
	}

}


//获取热销
function get_hot(num, page, order, sort){

	var json = {};
	json.status = 3;

	$.ajax({
         type: "get",
         url: api + "/client_hot_new",
         data: { filters: json, num: num, page: page,order: order, sort: sort },
         dataType: "json",
	     xhrFields: {
	         withCredentials: true
	     },
	     success: function(data){

	     	create_hot(data.data);

         },
         error: function(data){
         	
         	data = eval('('+data.responseText+')');

         	alert(data.msg);
         }
     });


}

//生成热销
function create_hot(json){

	var li = '';

	$.each(json, function(index, item){
			li += '<li class="flag_out"><a target="_blank" href="' + http + item.alimama_url + '" onclick=add_read(' + item.id + ')><div class="pro_img"><img src="' + api + item.photo + '" alt="' + item.name + '"></div><div class="pro_info"><div class="tit_area"><strong class="pad10">' + item.name + '</strong></div><div class="attr"><span class="price">¥' + item.read_num + '</span><del></del></div><div class="attr"><span class="line">已售<font class="fc_index_orangeRed">' + item.read_num + '</font>件</span><span class="sales"></span><span class="">特卖商城</span></div></div></a><img src="" id="exposImg" style="display: none;"></li>';
	});


	$('#create_hot').append(li);

	if(json.length){
		$('.show_create_hot').show();
	}

}


//获取最新
function get_new(num, page, order, sort){

	var json = {};
	json.status = 3;

	$.ajax({
         type: "get",
         url: api + "/client_hot_new",
         data: { filters: json, num: num, page: page,order: order, sort: sort },
         dataType: "json",
	     xhrFields: {
	         withCredentials: true
	     },
	     success: function(data){

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















