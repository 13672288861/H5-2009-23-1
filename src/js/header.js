function getStyle(dom,attr){
    if(dom.currentStyle){
        return dom.currentStyle[attr]
    }else{
        return getComputedStyle(dom,false)[attr]
    }
}
function animate(obj,json,callback){
    clearInterval(obj.timer)
    obj.timer=setInterval(function(){
        for(var key in json){
            var target=json[key]
            var currentHeight=getStyle(obj,key)
            var speed=target>parseInt(currentHeight)?Math.ceil((target-parseInt(currentHeight))/10):Math.floor((target-parseInt(currentHeight))/10)
            obj.style[key]=parseInt(currentHeight)+speed+"px"
            if(parseInt(currentHeight)==1){
                obj.style[key]=0+"px"
            }
            if(target==parseInt(currentHeight)){
                clearInterval(obj.timer)
            }
        }
        // callback()||callback()
    },1000/60)
}
var _ulRight=document.getElementsByClassName("nav-only-right")[0];
for(var i=0;i<_ulRight.children.length;i++){
    if(i==1||i==3||i==2){
        let index=null
        if(i==1){
            index=2
        }
        else{
            index=1
        }
        _ulRight.children[i].onmouseenter=function(){
            // this.children[2].style.height="210px";
            animate(this.children[index],{"height":this.children[index].children.length*30})
            this.onmouseleave=function(){
                animate(this.children[index],{"height":0})
            }
            for(var i=0;i<this.children[index].children.length;i++){
                this.children[index].children[i].onmouseenter=function(){
                    this.style.backgroundColor="#fff";          
                }
                this.children[index].children[i].onclick=function(){
                    this.parentNode.parentNode.children[0].innerText=this.innerText
                }
                this.children[index].children[i].onmouseleave=function(){
                    this.style.backgroundColor="wheat"
                }
            }
        }
    }
    
    
}

//app下载
var $navSpan=document.querySelector(".nav-only-right-first-span");
$navSpan.parentNode.onmouseenter=function(){
    $navSpan.children[0].style.display="block"
    $navSpan.parentNode.onmouseleave=function(){
        $navSpan.children[0].style.display="none"
    }
}
//购物车
var _gouwuche=document.getElementById("gowu")
_gouwuche.onclick=function(){
    if(document.cookie){
        location.assign("../pages/gouwuche.html");
        console.log(1);
    }else{
        location.assign("../pages/login.html");
    }
}

