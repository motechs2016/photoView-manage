window.onload = function() {
	getAlbums()
}


function getAlbums() {
	$.ajax({
        type: 'get',
        url: 'server/getAlbum.php',
        datatype: 'json',
        success: function (data) {
            console.log(data);
        }
    });
}