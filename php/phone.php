<?php
include('./public.php');
$phone=$_GET['phone'];
if($phone!=null){
	$sql="select * from userinfo where phone='$phone'";
	$res=$conn->query($sql);
	if($res->num_rows){
		// 有当前用户
		$row=$res->fetch_assoc();
		$price=$row['price'];
		$myArray= (object) array('code' =>'ok','price'=>$price);
	}else{
		// 没有当前用户
		$sql="insert into userinfo (phone,price) values('$phone','0')";
		$res=$conn->query($sql);
		$myArray= (object) array('code' =>'no','price'=>'0');
	}
	echo json_encode($myArray);
}else{
	echo 'noooo';
}
?>