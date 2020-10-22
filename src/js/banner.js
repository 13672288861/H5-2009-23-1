var _banner=document.getElementsByClassName("banner")[0]
var _span=document.querySelectorAll(".span")
var arr=["../images/1.jpg","../images/2.jpg","../images/3.jpg"]
var index=0
var timer=null
_span[index].className="spans span"
for(let i=0;i<_span.length;i++){
    _span[i].index=i
}
function lunbo(obj,attr){
    clearInterval(_banner.timer)
    var s=1
    var curr=getStyle(obj,attr)
    obj.timer=setInterval(function(){
        obj.style[attr]=curr-s/100
        curr=getStyle(obj,attr)
        if(curr<=0){
            curr=s/100
            s=-s
            for(var i=0;i<_span.length;i++){
                _span[i].className="span"
            }
            index++
            if(index==3){
                index=0
            }
            _banner.style.background="url("+arr[index]+")"
            _span[index].className="spans span"
        }
        if(curr>=1){           
            clearInterval(_banner.timer)
            // s=-s
        }
    },1000/60)

}
function auotplay(){
    clearInterval(timer)
    timer=setInterval(function(){
        lunbo(_banner,"opacity")
    },7000)
}
_span[0].parentNode.onclick=function(e){
    var e=e||window.event;
    var target=e.target||e.srcElement
    if(target.nodeName=="SPAN"){
        for(var i=0;i<_span.length;i++){
            _span[i].className="span"
        }
        _banner.style.background="url("+arr[target.index]+")"
        _span[target.index].className="span spans"
        index=target.index

    }
}
auotplay()
_banner.onmouseenter=function(){
    clearInterval(_banner.timer)
    clearInterval(timer)
}
_banner.onmouseleave=function(){
    _banner.style["opacity"]=1
    auotplay()
}