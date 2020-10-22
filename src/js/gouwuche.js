window.onload = function () {
    var _li = document.getElementById("uname")
    let cname = document.cookie.split("=")[1]
    if (cname) {
        _li.innerHTML = cname
    }
    var _mainBOx = document.getElementsByClassName("main-box")[0];
    var _mainBOxDate = document.getElementsByClassName("main-box-data")[0];
    var _mainBOxGou = _mainBOx.children[0];
    var json = `usename=${cname}`;
    // var cmainGou=document.getElementsByClassName("main-box-wupin")[0];
    var money = document.getElementsByClassName("money");
    var clear = document.getElementsByClassName("main-box-bottom-left")[0];
    var gouWuCheNum = document.getElementsByClassName("gouwunum")[0]
    clear.onclick = function () {
        _mainBOxGou.innerHTML = "<h1>您的购物车为空<br>下面是为您推荐的商品</h1>";
        _mainBOxGou.children[0].style = "text-align: center;line-height:40px;color:pink;";
        ajaxPostGou("../lib/goodinsert.php", `usename=${cname}&clear=clear`);
        money[0].innerText = money[2].innerText = sumMoney
    }
    ajaxPostGou("../lib/goodinsert.php", json)
    ajaxPostGou("../lib/date.json");
    function ajaxPostIgou(url, json, bol = true) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, bol);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(json);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 300)) {
                gouWuCheNum.innerText = _uls.length
            }
        }
    }
    function ajaxPostGou(url, json) {
        var sumMoney = null
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(json);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 300)) {
                if (!json) {
                    var jsona = JSON.parse(xhr.responseText);
                    var str = "";
                    for (var i = 0; i < jsona.length; i++) {
                        str += `<ul class="ul-data">
                    <li class="lis1 li12">
                        <img src="${jsona[i].b}" alt="">
                        <span>${jsona[i].a}</span><br>
                        <span>规格：一份(${jsona[i].c})</span><br>
                        <span class="iconfont gouwuche">&#xe610;</span>
                    </li>
                    </ul>`
                    }
                    _mainBOxDate.innerHTML = str;
                    let inGouWu = document.getElementsByClassName("gouwuche");
                    for (var i = 1; i < inGouWu.length; i++) {
                        inGouWu[i].index = i;
                        inGouWu[i].onclick = function () {
                            var json = `usename=${document.cookie.split("=")[1]}&img=${this.parentNode.children[0].src}&goodname=${this.parentNode.children[1].innerText}&sv=${jsona[this.index - 1].c}&num=1`
                            ajaxPostIgou("../lib/goodselect.php", json, false);
                            // 把上面的请求设置为同步  可以知道我们完成上面请求过后再去完成查询和页面渲染的功能

                            ajaxPostGou("../lib/goodinsert.php", `usename=${cname}`);
                        }
                    }
                }
                if (json) {
                    if (json.split("&").length == 2) { 
                        gouWuCheNum.innerText = 0;
                    }
                    if (json.split("&").length == 1 || json.split("&").length == 5 && xhr.responseText != "true") {
                        var a = `<ul class="uls ul">
                    <li class="lis1 li12">
                        <img src="" alt="">
                        <span></span><br>
                        <span>规格：45g(一份)</span><br>
                        <span class="iconfont gouwuche">&#xe610;</span>
                    </li>
                    <li class="lis2 li12">
                        <select name="" id="select">
                            <optgroup>
                                <option value="">请选择的您的神日派</option>
                                <option value="">请选择的您的神日派</option>
                                <option value="">请选择的您的神日派</option>
                                <option value="">请选择的您的神日派</option>
                            </optgroup>
                        </select>
                    </li>
                    <li class="lis3 li345"></li>
                    <li class="lis4 li345">
                        <input type="button" value="-" id="cut">
                            <input type="text" value="1" data-max="99">
                            <input type="button" value="+" id="add">
                        </li>
                    <li class="lis5 li345 sMoney"></li>
                    </ul>`
                        //处理数据库回来的数据
                        var arr1 = [];
                        _mainBOxGou.innerHTML = "";
                        var arr = xhr.responseText.split(`${cname}`).join("").split("abc");
                        var b = parseInt(arr.length / 6);//注意 这边传来的的数据的长度/6 是个小数  循环里面发生了错误  所以要取整                                  
                        for (var i = 0; i < b; i++) {
                            arr1[i] = arr.splice(2 * (i + 1), 4);
                            _mainBOxGou.innerHTML += a
                        }
                        window._uls = document.getElementsByClassName("uls");
                        _uls[0].className = "uls";
                        gouWuCheNum.innerText = _uls.length;
                        arr1.forEach((element, index) => {
                            _uls[index].children[0].children[0].src = element[0];
                            _uls[index].children[0].children[1].innerText = element[1];
                            _uls[index].children[2].innerText = element[2];
                            sumMoney += parseFloat(element[3]) * parseFloat(element[2])
                            _uls[index].children[3].children[1].value = element[3];
                            _uls[index].children[4].innerText = (parseFloat(element[3]) * parseFloat(element[2])).toFixed(2);
                        });
                        money[0].innerText = money[2].innerText = sumMoney.toFixed(2);
                        _mainBOxGou.onclick = function (e) {
                            var e = e || window.event;
                            var target = e.target || e.srcElement;
                            if (target.id == "cut") {
                                target.parentNode.children[1].value = parseInt(target.parentNode.children[1].value) - 1;
                                var json = `usename=${document.cookie.split("=")[1]}&img=${target.parentNode.parentNode.children[0].children[0].src}&goodname=${target.parentNode.parentNode.children[0].children[1].innerText}&sv=${target.parentNode.parentNode.children[2].innerText}&num=${target.parentNode.children[1].value}`
                                    ; ajaxPostGou("../lib/goodinsert.php", json);
                                if (target.parentNode.children[1].value < 1) {
                                    target.parentNode.parentNode.parentNode.removeChild(target.parentNode.parentNode);
                                }
                                target.parentNode.parentNode.lastElementChild.innerText = (parseFloat(target.parentNode.children[1].value) * parseFloat(target.parentNode.parentNode.children[2].innerText)).toFixed(2);
                            }
                            if (target.id == "add") {
                                target.parentNode.children[1].value = parseInt(target.parentNode.children[1].value) + 1;
                                var json = `usename=${document.cookie.split("=")[1]}&img=${target.parentNode.parentNode.children[0].children[0].src}&goodname=${target.parentNode.parentNode.children[0].children[1].innerText}&sv=${target.parentNode.parentNode.children[2].innerText}&num=${target.parentNode.children[1].value}`
                                    ; ajaxPostGou("../lib/goodinsert.php", json);
                                // console.log(target.parentNode.children[1].value,target.parentNode.parentNode.children[2]);
                                target.parentNode.parentNode.lastElementChild.innerText = (parseFloat(target.parentNode.children[1].value) * parseFloat(target.parentNode.parentNode.children[2].innerText)).toFixed(2);

                            }
                            var summ = null
                            // ajaxPostGou("../lib/date.json");
                            for (var i = 0; i < this.children.length; i++) {
                                summ += parseInt(this.children[i].lastElementChild.innerText)
                            }
                            money[0].innerText = money[2].innerText = summ;
                        }
                        // 购物车页面点击加入购物车  就直接加入一个变量a
                        if(xhr.responseText==null){
                        
                            _mainBOxGou.innerHTML="<h1>您的购物车为空<br>下面是为您推荐的商品</h1>"
                            _mainBOxGou.children[0].style="text-align: center;line-height:40px;color:pink;"
                        }
                    }
                      
                } 
            }
        }
        
    }
}