<?php
    header("content-type : application/x-www-form-urlencoded;charset=utf-8;");
    $usename=$_POST["usename_"];
    $conn = mysqli_connect('localhost','root','root','text');
    // var_dump($usename,$pas);
    // 2 执行sql语句
    // 第一种方式的时候,必须要完全按照数据里面的字段数量添加
    $sql1 = "SELECT * FROM `good` WHERE `usename`='$usename' ";
    // 第二种方式的时候,字段和数据库里面不匹配的时候会报错
    // $sql1 = "INSERT INTO `name` (`cname`) VALUES ('$usename')";
    $res1 = mysqli_query($conn,$sql1);
    // 3 插入不需要解析结果
    $row1 = mysqli_fetch_all($res1,MYSQLI_ASSOC);
    var_dump($row1);
    // if($row1){
    // // 如果$row是null
    // // 表示登陆失败
    //     echo json_encode(res1);
    // // header('location:./zhuce.html');
    // }else{
    //     echo json_encode(false)
    // } 
    // 4 断开连接
    mysqli_close($conn);
?>