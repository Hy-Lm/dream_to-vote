<?php
//角色
include('./public.php');
//每页从哪里开始，到哪里结束
	if(isset($_GET['page'])){
	        $page=$_GET['page'];  //传参代表的是第n页；
	}else{
	        $page=1;  //如果不传参默认是第一页；
	}
	$page_size=$_GET['page_size'];
	$start=($page-1)*$page_size;
		     //$page_size;---》设置的每页显示的条数
	$sql1="select * from dream_title";
	$res1=$conn->query($sql1);
	$row1=$res1->fetch_assoc();
$sql="select * from role limit $start,$page_size";
$res=$conn->query($sql);
$arr=[];
while($row=$res->fetch_assoc()){
	$row['role_img']=$URL.$row['role_img'];//图片
	$row['type']=$row1['type'];//电影类型
	$row['title']=$row1['title'];//电影名字
	$arr []=$row;
}
$sql1="select * from role"; 
		$res1=$conn->query($sql1);
		$row1=$res1->fetch_assoc();
		$arr1=[];
		//得到全部选手的长度
		while($row1=$res1->fetch_assoc()){
			$arr1 []=$row1;
		}
		if($res1->num_rows>0){
			$arrCount= intval(count($arr1))+1;
		}else{
			$arrCount=0;
		}
		$myArray= (object) array('all' =>$arr,'count'=>$arrCount); //将多个对象添加给一个数组给数组
		echo json_encode($myArray);
?>