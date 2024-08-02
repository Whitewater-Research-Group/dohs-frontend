<?php

namespace App\Controllers;
use CodeIgniter\Controller;

class Secure extends Controller
{
    public $data= array();
    
    public function __construct()
    {


     }
    public function index()
    {
         //$this->send_the_email('kemin',  'theperson@ex.com', 'test msg Accessed home', 'eddie.olaye@gmail.com', []);

        return view('secure', $this->data);
    }


    public function portal()
    { 
        return view('portal', $this->data);
    }





}
