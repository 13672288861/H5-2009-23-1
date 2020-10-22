<?php
  // header('content-type:text/html;charset=utf-8;');
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

// 0 解决中文乱码问题
// include './base.php';
header('content-type : application/x-www-form-urlencoded;charset=utf-8;');

// 1 获取前端传递来的数据
$uname = $_POST['usename_'];//获取前端传递的用户名
$upass = $_POST['passward_'];//获取前端传递的密码
$uname =  ltrim($uname);
$upass =  ltrim($upass);
// 看一看能不能拿到前端传递来的数据
// 2 使用前端给的数据去数据库里面对比
// 2-1 连接数据库
$conn = mysqli_connect('localhost','root','root','text');
// 2-2 执行sql语句
// 查询info表里面是否有一条数据,username=$uname并且password=$upass
$sql = "SELECT * FROM `html` WHERE `zhang`='$uname' AND `pas`='$upass'";
$res = mysqli_query($conn,$sql);
// 2-3 解析结果
$row = mysqli_fetch_assoc($res);
// 2-4 断开连接
mysqli_close($conn);
// 根据用户名和密码是否存在来输出结果
if($row){
  // 如果$row强制布尔是true,说明有结果
  // 表示登陆成功
  // setcookie("user","$uname");
  // header('location:./index.html');
  echo json_encode(true);
}else{
  // 如果$row是null
  // 表示登陆失败
  echo json_encode(false);
  // echo json_decode("用户名或密码错误!") ;
}  
?>