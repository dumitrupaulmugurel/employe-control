<?php

class Signup {
	
	private $db_host = "localhost"; 
	private $db_user = "root"; 
	private $db_pass = ""; 
	private $db_name = "employe_control"; 
	private $con; 
 
	
	
	function __construct(){
		
		if( isset($_POST['insert'] ) ){
			$this->connect();
			$this->insertUser($_POST);
		}
		
	}
	
	public function connect()
    {
        if(!$this->con)
        {
            $myconn = @mysql_connect($this->db_host,$this->db_user,$this->db_pass);
            if($myconn)
            {
                $seldb = @mysql_select_db($this->db_name,$myconn);
                if($seldb)
                {
                    $this->con = true; 
                    return true; 
                } else
                {
                    return false; 
                }
            } else
            {
                return false; 
            }
        } else
        {
            return true; 
        }
    }
	
	function insertUser($data){
		
		$sql = "INSERT INTO `users`( `name`, `email`, `pass`, `type`, `image`) VALUES ('{$data["name"]}','{$data["email"]}','{$data["pass"]}','employe','{$data["imagepath"]}')";
		echo $sql;
		 $ins = @mysql_query($sql);            
            if($ins)
            {
                echo "success"; 
            }
            else
            {
                echo "fail"; 
            }
	}
	
}

$signup = new Signup();
?>