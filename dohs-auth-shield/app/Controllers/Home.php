<?php

namespace App\Controllers;
use App\Models\Product;
use App\Models\Kpi;
use CodeIgniter\Controller;

class Home extends Controller
{
    public $product = NULL;
    public $srvice = NULL;
    public $data= array();
    public $session = NULL;
    
    public function __construct()
    {


     }
    public function index()
    {
         //$this->send_the_email('kemin',  'theperson@ex.com', 'test msg Accessed home', 'eddie.olaye@gmail.com', []);

        return view('home', $this->data);
    }


    public function portal()
    { 
        return view('portal', $this->data);
    }





}
