<?php 

function generateRandomDigits() {
    $digits = array();
    for ($i = 0; $i < 7; $i++) {
      $digits[] = rand(0, 9); // generates a random digit between 0 and 9
    }
    return $digits;
}

generateRandomDigits();

?>