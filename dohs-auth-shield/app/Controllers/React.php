<?php
namespace App\Controllers;
use App\Models\Product;
use CodeIgniter\Controller;
// defined('BASEPATH') OR exit('No direct script access allowed');
class React extends BaseController
{
    public function index()
    {
        return view('react/react_view');
    }
}