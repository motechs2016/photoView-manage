window.onload = function() {
	getAlbums();
    addAlbum();
}

//从后台获取相册信息并展示
function getAlbums(xr) {
    if(xr) {
        console.log(xr.responseText);
        console.log(xr.responseText === "NAME_NULL");
    }
    ajax("../server/getAlbum.php",{
        onsuccess: function(xhr) {
            var albums_ul = document.getElementById("albums");
            console.log(xhr.responseText);
            if(xhr.responseText) {
                var recive = JSON.parse(xhr.responseText);
                for( var i=0;i<recive.length;i++ ) {
                    var tmp =  JSON.parse(recive[i]);
                    var album_li = document.createElement("li");
                    album_li.innerHTML = tmp.name+"&nbsp;&nbsp;(<span class=\"num\">&nbsp;"+tmp.num+"&nbsp;</span>)";
                    albums_ul.appendChild(album_li); 
                }
            }
        }
    });

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
            var abm_input = document.getElementById("abm-input");
            EventUtil.addHandler(abm_input,"blur",function() {
                ajax("../server/addAlbum.php",{
                    "type": 'POST',
                    "data": "album="+abm_input.value,
                    "onsuccess": getAlbums
                });
            });
        }

    });
}
