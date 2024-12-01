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

$commonIdsHashmap = array_flip(array_intersect($list1, $list2));
$commonIds = array_filter($list2, static function($value) use ($commonIdsHashmap) { return isset($commonIdsHashmap[$value]); });
var_dump(array_sum($commonIds));