$(function(){

	get_ad(2);
	get_new(set_num, 1);

})



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
			div += '<div class="item active"><img src="' + api + item.photo + '" alt="" style="height: 420px;width: 100%;"></div>';
		}
		else {
			li += '<li data-target="#carousel-example-generic" data-slide-to="' +index+ '" style="margin-right: 3px"></li>'
			div += '<div class="item"><img src="' + api + item.photo + '" alt="" style="height: 420px;width: 100%;"></div>';
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
function get_new(num, page){

	var json = {};
	json.status = 3;

	$.ajax({
         type: "get",
         url: api + "/client_ac",
         data: { filters: {"type":0,"status":1}, num: num, page: page },
         dataType: "json",
	     xhrFields: {
	         withCredentials: true
	     },
	     success: function(data){

	     	create_new(data, num, page);

         },
         error: function(data){
         	
         	data = eval('('+data.responseText+')');

         	alert(data.msg);
         }
     });


}

//生成最新
function create_new(json, num, page,count){

	var div = '';

	$.each(json.data, function(index, item){
		div += '<div class="dealad"><a href="' + http + item.alimama_url + '" onclick=add_read(' + item.id + ') target="_blank"><img src="'+api+item.photo+'"></a><h3><a target="_blank" href="#">' + item.title + '</a></h3><h4><span><a target="_blank" href="#">' + item.name + '</a></span><a target="_blank" href="#"></a></h4></div>';
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


















