<?php  
        $conn = new mysqli('localhost','root','root','agendaphp');

        if($conn->connect_error ){
            echo $error -> $conn->connect_error;
        }

?>