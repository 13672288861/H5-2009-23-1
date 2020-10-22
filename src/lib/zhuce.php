<?php
//   header('content-type:text/html;charset=utf-8;');
  /*接收前端传递来的数据
      ==>在我们php里面有一些预先定义好的变量
      ==>是php本身自带的变量
  预定义变量里面有什么
      ==>$_GET
      ==>$_POST
      ==>$_REQUEST
      ==>$_COOKIE

  前端通过get方式传递数据给后端
      ==>http://localhost:80/07login.php?key1=value1&key2=value2

  $_GET 这个变量是一个关联型数组
      ==>存储的就是前端通过get方式提交来的信息
      ==>例子:前端传递的数据是username=admin&password=123456
      ==>后端的$_GET就是array('usernmae'=>'admin','password'=>123456)
      ==>想要获取前端传递来的数据,就从这个关联数组里面拿出来就可以了
      ==>从关联数组里面获取数据
      ==>数组名称['要获取的key']

    
*/
header('content-type : application/x-www-form-urlencoded;charset=utf-8;');
$usename=$_POST['usename_'];
$pas=$_POST['passward_'];
$usename =  ltrim($usename);
$pas =  ltrim($pas);
// 1 建立连接
$conn = mysqli_connect('localhost','root','root','text');
// var_dump($usename,$pas);
// 2 执行sql语句
// 第一种方式的时候,必须要完全按照数据里面的字段数量添加
$sql1 = "SELECT * FROM `html` WHERE `zhang`='$usename' ";
// 第二种方式的时候,字段和数据库里面不匹配的时候会报错
// $sql1 = "INSERT INTO `name` (`cname`) VALUES ('$usename')";
$res1 = mysqli_query($conn,$sql1);
// 3 插入不需要解析结果
$row1 = mysqli_fetch_all($res1,MYSQLI_ASSOC);
if($row1){
    // 如果$row是null
    // 表示登陆失败
    echo "注册失败,用户名重复";
    // header('location:./zhuce.html');
}else{
    $sql= "INSERT INTO `html` (`zhang`,`pas`) VALUES ('$usename','$pas')";
    $res = mysqli_query($conn, $sql);
    if($res){
    // 如果$row强制布尔是true,说明有结果
    // 表示登陆成功
    // echo "注册成功"
    // header('location:./login.html');
        // $_COOKIE("uesname","$usename",time()+3600);
        echo json_encode(true);
    }else{
    // 如果$row是null
    // 表示登陆失败
    // header('location:./zhuce.html');
        echo json_encode(false);
    }
} 
// 4 断开连接
mysqli_close($conn);
?>