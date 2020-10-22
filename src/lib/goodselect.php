<?php
    header("content-type : application/x-www-form-urlencoded;charset=utf-8;");
    $usename=$_POST["usename"];
    $conn = mysqli_connect('localhost','root','root','text');
    
    if(count($_POST)>3){
        $goodname=$_POST["goodname"];
        $img=$_POST["img"];
        $sv=$_POST["sv"];
        $num=$_POST["num"];
    // 2 执行sql语句
    // 第一种方式的时候,必须要完全按照数据里面的字段数量添加
        $sql1 = "SELECT * FROM `good` WHERE `uname`='$usename' AND `goodname`='$goodname'";
        // 第二种方式的时候,字段和数据库里面不匹配的时候会报错
        // $sql1 = "INSERT INTO `html` (`goodname`) VALUES ('$goodname')";
        $res1 = mysqli_query($conn,$sql1);
        // 3 插入不需要解析结果
        $row1 = mysqli_fetch_all($res1,MYSQLI_ASSOC);
        if($row1){
        // 如果$row是nul
            $id=$row1[0]["Id"];
            $num1=(int)$row1[0]["num"]+(int)$num;
            // $row2 = mysqli_fetch_all($res2,MYSQLI_ASSOC);
            $sql2= "UPDATE `good` SET `num`='$num1' WHERE `id`='$id'";
            $res2 = mysqli_query($conn,$sql2);
        }else{
            // 如果没有的话 就给你加进去
            $sql= "INSERT INTO `good` (`uname`,`img`,`goodname`,`sv`,`num`) VALUES ('$usename','$img','$goodname','$sv','$num')";
            $res = mysqli_query($conn, $sql);
        };
        echo json_encode(true);
    }else{
        $sql4 = "SELECT * FROM `good` WHERE `uname`='$usename'";
        // 第二种方式的时候,字段和数据库里面不匹配的时候会报错
        // $sql1 = "INSERT INTO `html` (`goodname`) VALUES ('$goodname')";
        $res4 = mysqli_query($conn,$sql4);
        // 3 插入不需要解析结果
        $row4 = mysqli_fetch_all($res4,MYSQLI_ASSOC);
        $sum=0;
        foreach ($row4 as $key => $value) {
            // foreach ($value as $key => $value1) {
            //     print_r($value1."abc");
            // }
            $sum++
        ;};
        echo json_encode($sum);
    }
    mysqli_close($conn);
?>