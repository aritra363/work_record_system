<?php
    $dbConnection = mysqli_connect("localhost","root","","work_record");
    if (!$dbConnection) {
        die();
    } else {
        if (isset($_GET['fetch']) && $_GET['fetch'] == 1) {
            $fetchData = "select * from works";
            $run = mysqli_query($dbConnection,$fetchData);
            $getData = mysqli_fetch_all($run,MYSQLI_ASSOC);
            echo json_encode($getData);
            die();
        } 
        if (isset($_GET['add']) && $_GET['add'] == 1) {
            $name = $_GET['name'];
            $wt = $_GET['work_type'] == '' ? 'Nil' : $_GET['work_type'] ;
            $ed = $_GET['e_date']== '' ? 'Nil' : $_GET['e_date'] ;
            $pd = $_GET['pd'] == '' ? 'Nil' : $_GET['pd'] ;
            $pl = $_GET['pl']== '' ? 'Nil' : $_GET['pl'] ;
            $insert_data = "insert into works(Name,Work_Type,End_Date,Payment_dn,Payment_lt) VALUES ('".$name."','".$wt."','".$ed."','".$pd."','".$pl."')";
            $run = mysqli_query($dbConnection,$insert_data);
            if ($run) {
                echo "1";
            } else {
                echo "0";
            }
        }
        if (isset($_GET['delete'])) {
            $delete_data = 'delete from works where id='.$_GET['delete'];
            $run = mysqli_query($dbConnection,$delete_data);
        }
        if (isset($_GET['edit'])) {
            $name = $_GET['name'] == '' ?'Nil' : $_GET['name'];
            $wt = $_GET['work_type'] == '' ? 'Nil' : $_GET['work_type'] ;
            $ed = $_GET['e_date']== '' ? 'Nil' : $_GET['e_date'] ;
            $pd = $_GET['pd'] == '' ? 'Nil' : $_GET['pd'] ;
            $pl = $_GET['pl']== '' ? 'Nil' : $_GET['pl'] ;
            $edit_data = "update works set Name = '".$name."',Work_Type='".$wt."',End_Date='".$ed."',Payment_dn='".$pd."',Payment_lt='".$pl."' where id =".$_GET['edit'];
            $run = mysqli_query($dbConnection,$edit_data);
        }
        if (isset($_GET['search'])) {
            $searchData = "select * from works where name like "."'".$_GET['search']."%'";
            $run = mysqli_query($dbConnection,$searchData);
            $getData = mysqli_fetch_all($run,MYSQLI_ASSOC);
            echo json_encode($getData);
            die();
        }
        die();
    }
?>