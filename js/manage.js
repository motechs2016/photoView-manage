window.onload = function() {
	addAlbum();
    ajax("../server/getAlbum.php",{
			onsuccess: getAlbums
		});
}

//从后台获取相册信息并展示
function getAlbums(xhr) {
    console.log(xhr.responseText);
/*    var recive = JSON.parse(xhr.responseText);
    console.log(recive.length);
    var tmp = JSON.parse(recive[0]);
    console.log(tmp,tmp.name);*/
}

//添加相册，点击按钮触发事件
function addAlbum() {
    var add_btn = document.getElementById("add-album");
    EventUtil.addHandler(add_btn,"click",function() {
        var abm_list = document.getElementById("albums");
        var abm_input = document.createElement("input");
        abm_input.id = "abm-input";
        abm_input.placeholder = "在这里填写相册名字";
        abm_list.appendChild(abm_input);
        //把输入框放在列表前面会不会好一点？

        if(document.getElementById("abm-input")) {
            console.log("come in");
            var abm_input = document.getElementById("abm-input");
            EventUtil.addHandler(abm_input,"blur",function() {
                ajax("../server/addAlbum.php",{
                    "type": 'POST',
                    "data": {"ablum":abm_input.value},
                    "onsuccess": getAlbums
                })
            });
        }
    });
}
