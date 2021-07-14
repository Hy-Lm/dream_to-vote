<?php
    $conn=new mysqli('localhost','root','','dream');
    $conn->query('set names utf8');
	 header('Access-Control-Allow-Origin:*');
	 if (!function_exists('array_column')) {
	  function array_column($arr2, $column_key) {
	   $data = [];
	   foreach ($arr2 as $key => $value) {
	    $data[] = $value[$column_key];
	   }
	   return $data;
	  }
	 }
	 // $URL='http://192.168.1.170/dream/php/images/';
	  $URL='http://192.168.7.108/dream_to-vote/php/images/';
?>