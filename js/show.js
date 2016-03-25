window.onload = function() {
	getType();
	getPhotos("ALL");
	EventUtil.addHandler(document,"scroll",function() {
		if(checkDown()) {
			var img_show = document.getElementById("img-show");
			var img_boxes = img_show.getElementsByTagName("img");
			var num = img_boxes.length;
			var leave_num = img_data.length-num;
			var deal_num = (leave_num>10) ? 10 : leave_num;
			insertImg(num,deal_num);
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
 *将想要加载的图片加入到img_show的dom结构中，然后调用布局函数
 */
function insertImg(first,num) {
	var img_show = document.getElementById("img-show");
	var fragment = document.createDocumentFragment();
	var new_img = new Image();
	for(var i=first;i<first+num;i++) {
		var tmp = JSON.parse(img_data[i]);
		var img_box = document.createElement("img");
		img_box.src = tmp.src;
		new_img.src = tmp.src;
		fragment.appendChild(img_box);
		if(i%3===0 ) {
			console.log("water");
			waterFall();
		}
	}
	img_show.appendChild(fragment);

	/*if(new_img.complete) {
		waterFall();
	}*/
	waterFall();
	//setTimeout(waterFall,10);     //防止图片没有加载完，布局函数中出错
}
/*
 *布局函数，规定列数为三列，用数组hArr记录每一列的总高度
 *如果不是第一行的三张图片，则需找到高度最小的列，将当前图片置于其下方，并修改数组
 */
function waterFall() {
	var main_box = document.getElementById("img-show");
	var img_boxes = main_box.getElementsByTagName("img"); //图片集合
	var hArr = [];
	for(var i=0,len=img_boxes.length;i<len;i++) {
		if( i<3 ) {
			console.log(i,img_boxes[i].width);
			hArr.push(img_boxes[i].offsetHeight);
		} else {
			console.log(i,img_boxes[i].clientHeight);
			var minHeight = Math.min.apply(null,hArr);
			var minIndex = getIndex(hArr,minHeight);
			img_boxes[i].style.position = "absolute";
			img_boxes[i].style.top = minHeight+"px";
			img_boxes[i].style.left = img_boxes[minIndex].offsetLeft+"px";
			hArr[minIndex] += img_boxes[i].clientHeight;
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
				if(type_name === "全部") {
					getPhotos("ALL");
				}else {
					getPhotos(type_name);
				}
			}
		});
	}
}