window.onload = function() {
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
			insertImg(0,first_screen);
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
	for(var i=first;i<first+num;i++) {
		var tmp = JSON.parse(img_data[i]);
		var img_box = document.createElement("img");
		img_box.src = tmp.src;
		fragment.appendChild(img_box);
	}
	img_show.appendChild(fragment);
	waterFall();
}
/*
 *布局函数，规定列数为三列，用数组hArr记录每一列的总高度
 *如果不是第一行的三张图片，则需找到高度最小的列，将当前图片置于其下方，并修改数组
 */
function waterFall() {
	var main_box = document.getElementById("img-show");
	var img_boxes = main_box.getElementsByTagName("img");
	var hArr = [];
	for(var i=0,len=img_boxes.length;i<len;i++) {
		if( i<3 ) {
			hArr.push(img_boxes[i].offsetHeight);
		} else {
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
 *判断是否应该加载新的图片，如果滑动滚轮的距离+可视区的高度>=页面高度则返回true 	
 */
function checkDown() {
	var oScroll = document.documentElement.scrollTop || document.body.scrollTop;
	var oHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
	var vHeight = document.documentElement.clientHeight || document.body.clientHeight;

	return (oScroll + vHeight >= oHeight) ? true:false
}