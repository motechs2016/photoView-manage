function ajax(url,options){
    var xhr,method ;
    if ( window.XMLHttpRequest ) {// code for IE7+, Firefox, Chrome, Opera, Safari
       xhr = new XMLHttpRequest();
    } else {// code for IE6, IE5
       xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    if( options.type ) {
        method = options.type;
    } else { 
        method = "GET";
    }

    xhr.open(method,url,true);
    if( options.data ) {
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8")
        console.log(options.data);
        xhr.send(options.data);

    }else {
    	xhr.send();
    }
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200){
            options.onsuccess(xhr);
        }else if( options.onfail ) {
            options.onfail();
        }
    }
}

var EventUtil={
    addHandler:function(element,type,handler){
        if (element.addEventListener) {            //DOM2级方法
            element.addEventListener(type, handler);
        } else if (element.attachEvent) {          //针对IE8及以下浏览器
            element.attachEvent("on" + type, handler);
        }else{
            element["on"+type] = handler;            //DOM0级方法
        }
    },
    removeHandler:function(element,type,handler){
        if (element.removeEventListenr) {              //DOM2级方法
            element.removeEventListenr(event, listener);
        } else if (element.detachEvent) {              //针对IE8及以下浏览器
            element.detachEvent("on" + event, listener);
        }else{
            element["on"+event] = null;            //DOM0级方法
        }
    },

    getEvent: function(event){
        return event ? event :window.event;
    },

    getTarget: function(event){           //事件真正的目标
        return event.target || event.srcElement;
    },

    preventDefault: function(event){       //取消事件的默认行为
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
    },
    stopProagation: function(event){       //取消事件进一步冒泡或者捕获
        if(event.stopProagation){
            event.stopProagation();
        }else{
            event.cancelBubble = true;
        }
    }
}