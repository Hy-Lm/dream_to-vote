<?php
date_default_timezone_set('prc'); //中国北京时间
// 标题
	include('./public.php');
	// //标题
	// 查询数据库 投票数人数，以及总投票数
		$sql2="select * from dream_players";
		$res2=$conn->query($sql2);
		// $row3=$res2->fetch_assoc();
		$vote=0;
		while($row=$res2->fetch_assoc()){
			$vote+=intval($row['player_vote']);//intval 强制转换类型
			$arr []=$row;
		}
		// echo $res2->num_rows;
		if($res2->num_rows>0){
			$players=count($arr);
		}else{
			$players=0;
		}
		// echo $vote.','.$players;
		$sql3="update dream_title  set vote='$vote',players='$players'";
		$res3=$conn->query($sql3);
		// 全部查询
		$sql1="select * from dream_title";
		$res1=$conn->query($sql1);
		$row1=$res1->fetch_assoc();
		// 转换图片路径
		$imgs=explode(",",$row1['banner_imgs']);
		unset($row1['banner_imgs']);
		$row1['banner_imgs']=$imgs;//图片
		$s=null;
		foreach($row1['banner_imgs'] as $value){
			$s.=$URL.$value.',';
		}
		$s = substr($s,0,strlen($s)-1);
		$s = explode(',',$s);
		$row1['banner_imgs']=$s;
		$row1['endTime']=$row1['end_time'];
		$row1['end_time']=intval($row1['end_time'])-intval(time());
		if($row1['end_time']<0){
			// $row1['end_time']=intval($row1['end_time'])-intval(time());
			$row1['end_time']='no';
		}
		// echo time();
		echo json_encode($row1);
	
	
?>