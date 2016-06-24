<?php

function generate_rack($n){
  $tileBag = "AAAAAAAAABBCCDDDDEEEEEEEEEEEEFFGGGHHIIIIIIIIIJKLLLLMMNNNNNNOOOOOOOOPPQRRRRRRSSSSTTTTTTUUUUVVWWXYYZ";
  $rack_letters = substr(str_shuffle($tileBag), 0, $n);
  
  $temp = str_split($rack_letters);
  sort($temp);
  return implode($temp);
};

$myrack = generate_rack(6);
$racks = [];
for($i = 0; $i < pow(2, strlen($myrack)); $i++){
	$ans = "";
	for($j = 0; $j < strlen($myrack); $j++){
		//if the jth digit of i is 1 then include letter
		if (($i >> $j) % 2) {
		  $ans .= $myrack[$j];
		}
	}
	if (strlen($ans) > 1){
  	    $racks[] = $ans;	
	}
}
$racks = array_unique($racks);
// print_r($racks);

//this is the basic way of getting a database handler from PDO, PHP's built in quasi-ORM
    $dbhandle = new PDO("sqlite:scrabble.sqlite") or die("Failed to open DB");
    if (!$dbhandle) die ($error);
 $real_words = [];
    //this is a sample query which gets some data, the order by part shuffles the results
    //the limit 0, 10 takes the first 10 results.
    // you might want to consider taking more results, implementing "pagination", 
    // ordering by rank, etc.
    foreach($racks as $rack){
    $query = "SELECT words FROM racks where rack ='$rack'";
    //this next line could actually be used to provide user_given input to the query to 
    //avoid SQL injection attacks
    $statement = $dbhandle->prepare($query);
    $statement->execute();
    
    //The results of the query are typically many rows of data
    //there are several ways of getting the data out, iterating row by row,
    //I chose to get associative arrays inside of a big array
    //this will naturally create a pleasant array of JSON data when I echo in a couple lines
    $temp_results = $statement->fetchAll(PDO::FETCH_ASSOC);
    
    if(sizeof($temp_results) >0 ){
    	$temp_results = $temp_results[0][words];
    	$temp_results = explode("@@", $temp_results);
    	
    }
    foreach($temp_results as $word){
       $real_words[] = $word;
    }
   
    }
    $results = array(rack => $myrack, words =>$real_words);
    
    header('HTTP/1.1 200 OK');
    //this lets the browser know to expect json
    header('Content-Type: application/json');
    //this creates json and gives it back to the browser
    echo json_encode($results);
?>