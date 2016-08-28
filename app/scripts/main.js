var api = 'http://localhost';
var http = 'http://'
var https = 'https://'
var set_num_small = 10;
var set_num = 20;


$(function(){

	get_type();
	get_ad(0);
	get_ac(set_num_small, 1);
	get_hot(set_num_small, 1, 'read_num', 'desc');
	get_new(set_num, 1, 'updateTime', 'desc');

	// $.ajax({
 //         type: "GET",
 //         url: api + "/client_type",
 //         data: {},
 //         dataType: "jsonp",
 //         jsonp:'callback',
	//      success: function(data){
	//      	// console.log(data);
 //             // $('#resText').empty();   //清空resText里面的所有内容
 //             // var html = ''; 
 //             // $.each(data, function(commentIndex, comment){
 //             //       html += '<div class="comment"><h6>' + comment['username']
 //             //                 + ':</h6><p class="para"' + comment['content']
 //             //                 + '</p></div>';
 //             // });
 //             // $('#resText').html(html);
 //          }
 //     });
})


//获取类型
function get_type(){

	$.getJSON(api + "/client_type?callback=?",function(data){ 
		
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


	})
}

//生成类型
function create_type(json){

	var html = '';

	$.each(json, function(index, item){

		html += '<li class="dropdown list" >'
		html += '<div class="list_cont nav-abroad-slide"><h3 class="nav_tle"><a href="#" target="_blank">' +item.name+ '</a></h3>';

         var ul = '';

		if(item.list){

			html += '<p class="listP">';


	        var ul = '<ul class="nav_list" style="display: none"><li><h4><a href="#" target="_blank">' +item.name+ '</a></h4><p>';

	        $.each(item.list, function(index, _item){

	        	if (index < 10) {
	        		if (index%2) {
	        			html += '<a href="/list.html?type=' + _item.id + '" class="red_f" target="_blank">' +_item.name+ '</a>';
	        		}
	        		else {
						html += '<a href="/list.html?type=' + _item.id + '" target="_blank">' +_item.name+ '</a>';
	        		}
	        		
	        	}

	        	ul += '<a href="/list.html?type=' + _item.id + '" target="_blank">' +_item.name+ '</a>';

	        });

	        ul += '</p></li></ul>'

	        html += '</p><samp class="corner">&gt;</samp>'

        }

        html += '</div>' + ul;

        html += '</li>';
	})


    

    $('#create_type').append(html);

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

	$.getJSON(api + "/client_ab?callback=?",{'filters': { 'type': 0, 'addr': addr }},function(data){ 
	    create_ad(data.data);
	})

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
			div += '<div class="item active"><img src="' + api + item.photo + '" alt="" style="height: 420px;"></div>';
		}
		else {
			li += '<li data-target="#carousel-example-generic" data-slide-to="' +index+ '" style="margin-right: 3px"></li>'
			div += '<div class="item"><img src="' + api + item.photo + '" alt="" style="height: 420px;"></div>';
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

	$.getJSON(api + "/client_ac?callback=?",{ filters: {"type":0,"status":1}, num: num, page: page },function(data){ 
	    create_ac(data.data);
	})

}

//生成抢购列表
function create_ac(json){

	var a = '';

	$.each(json, function(index, item){
			a += '<a href="' + http + item.alimama_url + '" class="saleDeal" target="" onclick=add_read(' + item.id + ')><div class="dealCon"><img src="' + api + item.photo + '" alt="" class="dealImg"/><div class="stock"><div class="xsqMask"></div><span class="stockWord"></span><span class="stockWord"><i class="stocknumber"></i></span></div></div><div class="title_new"><p class="word" title="' + item.title + '"><span class="baoyouText"></span>' + item.title + '</p></div><div class="dealInfo"><span class="price">¥<em>' + item.price +'</em></span><span class="shop_preferential"></span></div></a>';
	});

	$('#create_ac').append(a);

	$('#show_create_ac').show();

}


//获取热销
function get_hot(num, page, order, sort){

	var json = {};
	json.status = 3;

	$.getJSON(api + "/client_hot_new?callback=?",{ filters: json, num: num, page: page,order: order, sort: sort },function(data){ 
	    create_hot(data.data);
	})

}

//生成热销
function create_hot(json){

	var li = '';

	$.each(json, function(index, item){
			li += ' <li class="pic"><a target="_blank" href="' + http + item.alimama_url + '" onclick=add_read(' + item.id + ')><img src="' + api + item.photo + '" alt="9.9包邮"></a></li>';
	});


	$('#create_hot').append(li);

	$('#hotSaleIndex').show();

}


//获取最新
function get_new(num, page, order, sort){

	var json = {};
	json.status = 3;

	$.getJSON(api + "/client_hot_new?callback=?",{ filters: json, num: num, page: page,order: order, sort: sort },function(data){ 
	    create_new(data, num, page);
	})

}

//生成最新
function create_new(json, num, page,count){

	var div = '';

	$.each(json.data, function(index, item){
			div += '<div class="dealad"><a href="' + http + item.alimama_url + '" onclick=add_read(' + item.id + ') target="_blank"><img src="images/pt1.jpg"></a><h3><a target="_blank" href="#">' + item.title + '</a></h3><h4><span><a target="_blank" href="#">' + item.name + '</a></span><a target="_blank" href="#"></a></h4></div>';
	});

	if(json.data.length>0) {

		countPage = Math.ceil(json.count/num);

		var li = '';

		if (page == 1) {
			li += '<li class="disabled"><a href="javascript:prev(' + page + ')" aria-label="Previous"><span aria-hidden="true">上一页</span></a></li>'
		}
		else {
			li += '<li class=""><a href="javascript:prev(' + page + ')" aria-label="Previous"><span aria-hidden="true">上一页</span></a></li>'	
		}

		for (var i = 1; i <= countPage; i++) {

			if(page == i){
				li += '<li class="active">';
			}
			else {
				li += '<li class="">';
			}

			li += '<a href="javascript:to_num(' + i + ')">' + i + ' <span class="sr-only">(current)</span></a></li>'
		}

		if (page ==countPage) {
			li += '<li class="disabled"><a href="javascript:next(' + page + ',' + countPage + ')" aria-label="Next"><span aria-hidden="true">下一页</span></a></li>';
		}
		else {
			li += '<li class=""><a href="javascript:next(' + page + ',' + countPage + ')" aria-label="Next"><span aria-hidden="true">下一页</span></a></li>';
		}

		$('#create_new *').remove();
		$('#totalPages .pagination *').remove();	

		$('#create_new').append(div);
		$('#totalPages .pagination').append(li);

		$('#today_deals').show();
		$('#totalPages').show();
	}
	else {
		$('#today_deals').hide();
		$('#totalPages').hide();
	}

}

//跳到第几页
function to_num(page){
	get_new(set_num, page, 'updateTime', 'desc');
}

//上一页
function prev(page){
	if(page > 1) {
		get_new(set_num, page-1, 'updateTime', 'desc');
	}
}

//下一页
function next(page,count){
	if (count > page){
		get_new(set_num, page+1, 'updateTime', 'desc');
	}
}

//更新阅读数
function add_read(id){
	$.getJSON(api + "/client_read/" + id + "?callback=?",function(data){ 
	    
	})
}

//搜索
function search(){
	var val = $('#search_text').val();
	window.location.href="/search.html?name="+val; 
}
















