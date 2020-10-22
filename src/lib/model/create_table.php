<?php
require('./_connect.php');

//书写sql语句
$sql = "CREATE TABLE good (
			`Id` int(11) NOT NULL AUTO_INCREMENT,
			uname VARCHAR(300) NOT NULL,
			img VARCHAR(30) NOT NULL,
			goodname VARCHAR(30) NOT NULL,
			sv VARCHAR(30) NOT NULL,
			num VARCHAR(30) NOT NULL,
			submission_date TIMESTAMP	
)";
$sql1 = "CREATE TABLE html (
	`Id` int(11) NOT NULL AUTO_INCREMENT,
	zhang VARCHAR(300) NOT NULL,
	pas VARCHAR(300) NOT NULL,
	submission_date TIMESTAMP	
)";
$result = mysqli_query($conn,$sql);
$result1 = mysqli_query($conn,$sql1);
if($result){
	echo "数据表创建成功";
}else{
	echo "数据表创建失败";
}

?>