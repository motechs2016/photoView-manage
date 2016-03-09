window.onload = function() {
	getAlbums();
    addAlbum();
}

/*
 *如果该函数被调用时存在实参，则说明是addAlbum 后台传回的信息
 *否则则直接ajax向后台拉取相册信息
 */
function getAlbums(xr) {
    if(xr) {
        console.log(xr.responseText);
        var album_name = document.getElementById("album-name");
        var password = document.getElementById("password");
        if( xr.responseText === "NAME_NULL" ) {           //后台传回"NAME_NULL"表示没有填写相册名字
            album_name.style.border = "1px solid red";
            album_name.placeholder = "名字不能为空";
        } else if( xr.responseText === "DISTINCT_NAME") {
            album_name.style.border = "1px solid red";
            album_name.placeholder = "名字与现有相册重复";
        }else if( xr.responseText === "INPUT_OK") {         //如果传回"INPUT_OK"，表示相册创建成功，隐藏新建相册div，展示按钮
            album_name.style.border = "1px solid #fff";
            album_name.placeholder = "在这里输入相册名字";
            document.getElementById("add-box").style.display = "none";
            document.getElementById("add-album").style.display = "block";
            //将输入框置为空
            album_name.value = "";
            password.value = "";
        }
    }
    ajax("../server/getAlbum.php",{
        onsuccess: function(xhr) {
            var albums_ul = document.getElementById("albums");
            //每次拉取相册信息前重置相册列表
            albums_ul.innerHTML = "<li>全部&nbsp;&nbsp;(<span id=\"all-num\" class=\"num\"></span>)</li>"
            var all_num = 0;
            if(xhr.responseText) {
                var recive = JSON.parse(xhr.responseText);
                for( var i=0;i<recive.length;i++ ) {
                    var tmp =  JSON.parse(recive[i]);
                    var album_li = document.createElement("li");
                    all_num += parseInt(tmp.num);
                    album_li.innerHTML = tmp.name+"&nbsp;&nbsp;(<span class=\"num\">&nbsp;"+tmp.num+"&nbsp;</span>)<img class=\"edit-btn\" src=\"../src/pen.png\"><img class=\"del-btn\" src=\"../src/del.png\">";
                    albums_ul.appendChild(album_li);
                }
            }
            document.getElementById("all-num").innerHTML = "&nbsp;"+all_num+"&nbsp;";
            albumDeal();   //必须在相册信息拉取完之后才能执行albumDeal
        }
    });
    
}

/*
 *点击添加相册按钮，触发该事件函数
 *展示新建相册div，隐藏按钮，提交所填数据到server之后，由getaAlbums函数处理
 */
function addAlbum() {
    var add_btn = document.getElementById("add-album");
    EventUtil.addHandler(add_btn,"click",function() {
        add_btn.style.display = "none";
        document.getElementById("add-box").style.display = "block";

        var com_btn = document.getElementById("com-btn");
        EventUtil.addHandler(com_btn,"click",function() {
            var album_name = document.getElementById("album-name");
            var password = document.getElementById("password");
            ajax("../server/addAlbum.php",{
                "type": 'POST',
                "data": "album="+album_name.value+"&pwd="+password.value,
                "onsuccess": getAlbums
            });
        });
    });
}
/*
 *给每一个相册绑定事件
 */
 function albumDeal() {
    var albums = document.getElementById("albums");
    var albums_list = albums.getElementsByTagName("li");

    for(var i=1,len=albums_list.length;i<len;i++) {
        EventUtil.addHandler(albums_list[i],"mouseover",function(ev) {
            var over_li = EventUtil.getTarget(ev);
            if(over_li.nodeName.toLowerCase() !== "li") {
                over_li = over_li.parentNode;
            }
            addClass(over_li,"active");
            var edit_btn = over_li.getElementsByTagName("img")[0];
            var del_btn = over_li.getElementsByTagName("img")[1];
            edit_btn.style.display = "inline";
            del_btn.style.display = "inline";
            EventUtil.addHandler(edit_btn,"click",editAlbum);
        });
        EventUtil.addHandler(albums_list[i],"mouseout",function(ev) {
            var out_li = EventUtil.getTarget(ev);
            if(out_li.nodeName.toLowerCase() !== "li") {
                out_li = out_li.parentNode;
            }
            removeClass(out_li,"active");
            if( out_li.getElementsByTagName("img") ) {
                out_li.getElementsByTagName("img")[0].style.display = "none";
                out_li.getElementsByTagName("img")[1].style.display = "none";
            }
        });
    }
}

function editAlbum() {
    console.log(this);
}