$(function(){
	mobile_device_detect(host + "/moble.html");

	checkCookie();
	
	get_type();
	get_ad(1);
	get_ac(set_num_small, 1);
	get_hot(set_num_small, 1, 'read_num', 'desc');
	get_new(set_num, 1, 'updateTime', 'desc');

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

		if(index<5){


			html += '<div class="fls"><div class="flx"><h2>' +item.name+ '</h2><p style="margin-top: 10px;">'

	         var ul = '<ul class="nav_ul"><li><h4><a href="javascript:;" style="cursor: default;" target="_blank">' +item.name+ '</a></h4><p>';

			if(item.list){

		        $.each(item.list, function(index, _item){

		        	if (index < 10) {
		        		if (index%2) {
		        			html += '<a href="/list.html?type=' + _item.id + '" id="fp" target="_blank">' +_item.name+ '</a>';
		        			// ul += '<a href="/list.html?type=' + _item.id + '" class="red_f" target="_blank">' +_item.name+ '</a>';
		        		}
		        		else {
							html += '<a href="/list.html?type=' + _item.id + '" target="_blank">' +_item.name+ '</a>';
							// ul += '<a href="/list.html?type=' + _item.id + '" target="_blank">' +_item.name+ '</a>';
		        		}
		        		
		        	}

		        	if (index%2) {
		        			ul += '<a href="/list.html?type=' + _item.id + '" class="red_f" target="_blank">' +_item.name+ '</a>';
		        		}
		        		else {
							ul += '<a href="/list.html?type=' + _item.id + '" target="_blank">' +_item.name+ '</a>';
		        		}

		        });

		        


	        }

	        ul += '</p></li></ul>'

	        html += '</p><samp class="corner">&gt;</samp></div>' + ul;

	        html += '</div>';

	    }
	})

    $('#fl.create_type').append(html);

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

	var tu_img = '';
	var dos_dor = ''
	var fl_s0_img = ''

	var fl_s0_count = 0;

	$.each(json, function(index, item){

		tu_img += '<a href="' + http + item.alimama_url + '">';
		fl_s0_img += '<a href="' + http + item.alimama_url + '">';

		if(item.addr === 0){
			if(!tu_img){
				tu_img += '<img src="' + api + item.photo + '" alt="" style="display:block;" />';
			}
			else {
				tu_img += '<img src="' + api + item.photo + '" alt="" />';
			}
			dos_dor += '<a class="doro"></a>';
		}
		else if (item.addr === 1 && fl_s0_count < 5) {
			fl_s0_img += '<img src="' + api + item.photo + '" alt="" />';
			fl_s0_count ++;
		}


		tu_img += '</a>';
		fl_s0_img += '</a>';


	});


	$('#center.create_ad .fl_s .tu').append(tu_img);
	$('#center.create_ad .fl_s .dos .dor').append(dos_dor);
	$('#center.create_ad .fl_s0 .fl_s1 .fl_s2').append(fl_s0_img);

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
			a += '<a href="' + http + item.alimama_url + '" class="saleDeal" target="" onclick=add_read(' + item.id + ')><img src="' + api + item.photo + '" alt="" class="dealImg"/></a>';
	});

	$('#create_ac').append(a);

	if(json.length){
		$('.show_create_ac').show();
	}

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

	var div = '';

	

	$.each(json, function(index, item){

		div += '<div class="tp3_2"><div class="tp3_3"><a target="_blank" href="' + http + item.alimama_url + '" onclick=add_read(' + item.id + ')><img src="' + api + item.photo + '" alt="" /></a></div><div class="tp3_4"><span class="jg">￥' + item.price + '</span><span class="linek">' + item.read_num + '</span></div><div class="tio"><a target="_blank" href="' + http + item.alimama_url + '" onclick=add_read(' + item.id + ')>' + item.name + '</a></div></div>'

	});


	$('#create_hot').append(div);

	if(json.length){
		$('.show_create_hot').show();
	}


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
function create_new(json, num, page){

	var div = '';

	$.each(json.data, function(index, item){

		div += '<div class="tp3_2"><div class="tp3_3"><a target="_blank" href="' + http + item.alimama_url + '" onclick=add_read(' + item.id + ')><img src="' + api + item.photo + '" alt="" /></a></div><div class="tp3_4"><span class="jg">￥' + item.price + '</span><span class="linek">' + item.read_num + '</span></div><div class="tio"><a target="_blank" href="' + http + item.alimama_url + '" onclick=add_read(' + item.id + ')>' + item.name + '</a></div></div>'

	});


	$('#create_new').append(div);

	if(json.data.length){
		$('.show_create_new').show();
	}


}















