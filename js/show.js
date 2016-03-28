window.onload = function() {
	getType();
	getPhotos("ALL");
	EventUtil.addHandler(document,"scroll",function() {
		//判断是否满足加载图片的条件
		if(checkDown()) {
			var img_show = document.getElementById("img-show");
			var img_boxes = img_show.getElementsByTagName("img");
			var num = img_boxes.length;
			var leave_num = img_data.length-num;
			if(leave_num>0) {
				var deal_num = (leave_num>10) ? 10 : leave_num;
				insertImg(num,deal_num);
			}
		};
	});
}
/*
 *用ajax向后台请求相册数据并显示在导航栏
 */
function getType() {
	ajax("../server/getAlbum.php",{
		onsuccess: function(xhr) {
			var albums = JSON.parse(xhr.responseText);
			var fragment = document.createDocumentFragment();
			for(var i=0;i<albums.length;i++) {
				var album = JSON.parse(albums[i]);
				var album_li = document.createElement("li");
				album_li.innerHTML = album.name+"<span></span>";
				fragment.appendChild(album_li);
			}
			var type_lists = document.getElementById("type-list");
			type_lists.appendChild(fragment);
			showByType();
		}
	})
}
var img_data;   //存放图片信息的json数组
var first_screen = 15;      //首屏加载图片的数量
/*
 *根据传入的参数type：选择的相册，用ajax向后台请求图片信息
 *并将信息存在全局变量img_data中，然后调用insertImg将图片加入dom中
 */
function getPhotos(type) {
	ajax("../server/getPhotos.php",{
		"type": "POST",
		"data": "name="+type,
		onsuccess: function(xhr) {
			img_data = JSON.parse(xhr.responseText);
			var num = (first_screen>img_data.length)?img_data.length:first_screen;
			insertImg(0,num);
		}
	});
}
/*
 *first:起始图片的img_data中的位置。num:要加载的图片数量
 *图片加载完成之后，调用回调函数afterLoad
 */
function insertImg(first,num) {	
	for(var i=first;i<first+num;i++) {
		var tmp = JSON.parse(img_data[i]);
		var new_img = new Image();
		new_img.src = tmp.src;
		EventUtil.addHandler(new_img,"load",afterLoad);
	}
}

/*
 *回调函数将调用waterFall的闭包函数并删除该图片的事件处理程序
 */
var waterImg = waterFall();
function afterLoad() {
	waterImg(this);
	EventUtil.removeHandler(this,"load",afterLoad);
}
/*
 *img_fragment；新添加图片的文档片段。count：文档片段中图片数量
 *布局函数，规定列数为三列，用数组hArr记录每一列的总高度
 *包含一个闭包，用来改变count和img_fragment,并将文档片段添加到dom
 */
var hArr = [];
function waterFall() {
	var main_box = document.getElementById("img-show");
	var img_boxes = main_box.getElementsByTagName("img");
	var img_fragment = document.createDocumentFragment();
	var count = 0;
	return function(img) {
		count++;
		var new_img = document.createElement("img");
		new_img.src = img.src;
		var img_height = img.height*294/img.width;
		//前三张图片
		if(hArr.length < 3) {
			hArr.push(img_height+6);
			img_fragment.appendChild(new_img);
		} else {
			var minHeight = Math.min.apply(null,hArr);
			var minIndex = getIndex(hArr,minHeight);
			new_img.style.position = "absolute";
			new_img.style.top = minHeight+"px";
			new_img.style.left = img_boxes[minIndex].offsetLeft+"px";
			img_fragment.appendChild(new_img);
			hArr[minIndex] += (img_height+6);	
		}
		//如果文档片段里包含3张图片
		//或者图片数据img_data已经没有剩下的图片时将片段添加到dom
		if(count===3 || (img_data.length-img_boxes.length)===count) {
			count = 0;
			main_box.appendChild(img_fragment);
			img_fragment = document.createDocumentFragment();
		}
	}
}
function getIndex(arr,num) {
	for(var i=0;i<arr.length;i++) {
		if(arr[i] === num) {
			return i;
		}
	}
}
/*
 *判断是否应该加载新的图片，如果滚动条的距离+可视区的高度>=页面高度则返回true 	
 */
function checkDown() {
	//滚动条的距离
	var oScroll = document.documentElement.scrollTop || document.body.scrollTop;
	//页面高度
	var oHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
	//可视区的高度
	var vHeight = document.documentElement.clientHeight || document.body.clientHeight;

	return (Math.ceil(oScroll) + vHeight >= oHeight) ? true:false
}
/*
 *点击导航栏的分类，按照分类用ajax向后台请求相应的数据，然后显示在内容区
 */
function showByType() {
	var type_ul = document.getElementById("type-list");
	var type_lists = type_ul.getElementsByTagName("li");
	for(var i=0,len=type_lists.length;i<len;i++) {
		EventUtil.addHandler(type_lists[i],"click",function(ev) {
			var click_target = EventUtil.getTarget(ev);
			//确定目标元素为li而不是其子节点，否则后面添加active类时会出错
			if(click_target.nodeName.toLowerCase() !== "li") {
				click_target = click_target.parentNode;
			}
			var prev_active = document.getElementsByClassName("active");			
			removeClass(prev_active[0],"active");
			addClass(click_target,"active");

			var re_name = /(^[\u4E00-\u9FA5\uF900-\uFA2D]+|\w+)</;
			if(re_name.test(click_target.innerHTML)) {
				var type_name = RegExp.$1;    //所点击的类的名字
				var img_show = document.getElementById("img-show");
				img_show.innerHTML = "";
				hArr = [];
				if(type_name === "全部") {
					getPhotos("ALL");
				}else {
					getPhotos(type_name);
				}
			}
		});
	}
}