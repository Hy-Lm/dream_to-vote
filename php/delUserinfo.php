<?php
	// 删除用户名
	include('./public.php');
	// 接收参数
	$id=$_GET['id'];
	$sql="delete from userinfo where id='$id'";
	$res=$conn->query($sql);
	if($res){
		echo 'ok';
	}else{
		echo 'no';
	}
?>