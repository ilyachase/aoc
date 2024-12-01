<?php

$list1 = [];
$list2 = [];
foreach (file('./input.txt') as $line) {
    $locationIDs = array_map('intval', explode('   ', $line));
    $list1[] = $locationIDs[0];
    $list2[] = $locationIDs[1];
}

sort($list1);
sort($list2);

$distance = 0;
foreach ($list1 as $k => $value1) {
    $value2 = $list2[$k];
    $distance += abs($value1 - $value2);
}
var_dump($distance);
