window.onload = function() {
	getPhotos();
}
var img_data;   //存放图片信息的json数组
function getPhotos() {
	ajax("../server/getPhotos.php",{
		"type": "POST",
		"data": "name=ALL",
		onsuccess: function(xhr) {
			img_data = JSON.parse(xhr.responseText);
			init();
		}
	})
}
var first_screen = 15;
function init() {
	var img_show = document.getElementById("img-show");
	var fragment = document.createDocumentFragment();
	for(var i=0;i<first_screen;i++) {
		var tmp = JSON.parse(img_data[i]);
		var img_box = document.createElement("img");
		img_box.src = tmp.src;
		fragment.appendChild(img_box);
	}
	img_show.appendChild(fragment);
	waterFall();
}
function waterFall() {
	var main_box = document.getElementById("img-show");
	var img_boxes = main_box.getElementsByTagName("img");
	var hArr = [];
	for(var i=0,len=img_boxes.length;i<len;i++) {
		if( i<3 ) {
			hArr.push(img_boxes[i].offsetHeight);
			console.log(hArr);
		} else {
			var minHeight = Math.min.apply(null,hArr);
			var minIndex = getIndex(hArr,minHeight);
			console.log(minHeight,img_boxes[minIndex].offsetLeft);
			img_boxes[i].style.position = "absolute";
			img_boxes[i].style.top = minHeight+"px";
			img_boxes[i].style.left = img_boxes[minIndex].offsetLeft+"px";
			hArr[minIndex] += img_boxes[i].clientHeight;
		}
	} 
}

function getIndex(arr,min) {
	for(var i=0;i<arr.length;i++) {
		if(arr[i] === min) {
			return i;
		}
	}
}