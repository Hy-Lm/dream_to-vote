<?php
	// 所有礼物
	include('./public.php');
	// $openid=$_GET['openid'];
	// if($openid=='openid'){
		$sql="select * from gift";
		$res=$conn->query($sql);
		$arr=[];
		while($row=$res->fetch_assoc()){
			$row['gift_img']=$URL.$row['gift_img'];
			$arr [] =$row;
		}
		$order_col=array_column($arr,'gift_price');
		array_multisort($order_col,SORT_DESC,$arr);//排序，按照总利润排序
		echo json_encode($arr);
	// }else{
	// 	$sql1="select * from userinfo where phone='$openid'";
	// 	$res1=$conn->query($sql1);
	// 	$row1=$res1->fetch_assoc();
	// 	$price=$row1['price'];
	// 	// echo $prices;
	// 	$sql="select * from gift";
	// 	$res=$conn->query($sql);
	// 	while($row=$res->fetch_assoc()){
	// 		$row['gift_img']=$URL.$row['gift_img'];
	// 		$arr [] =$row;
	// 	}
	// 	$order_col=array_column($arr,'gift_price');
	// 	array_multisort($order_col,SORT_DESC,$arr);//排序，按照总利润排序
	// 	$myArray= (object) array('all' =>$arr,'price'=>$price); //将多个对象添加给一个数组给数组
	// 	echo json_encode($myArray);
	// }
	
?>