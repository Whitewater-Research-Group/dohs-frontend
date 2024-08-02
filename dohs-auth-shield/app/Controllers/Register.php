<?php 

namespace App\Controllers;  
use CodeIgniter\Controller;

use App\Models\UserModel;

  
class Register extends BaseController
{
    public function index()
    {
        helper(['form']);
        $data = [];
        echo view('awsome_signup');    //user did n ener email

    }
  
    public function store()
    {
        $session = session();
        helper(['form']);
        $rules = [
            'dname'          => 'required|min_length[2]|max_length[50]',
            'email'         => 'required|min_length[4]|max_length[100]|valid_email|is_unique[users.email]',
            'password'      => 'required|min_length[4]|max_length[50]',
            'confirm_password'  => 'matches[password]'
        ];
          
        if($this->validate($rules)){
            $model = new UserModel();

            $data = [
                'name'     => $this->request->getVar('dname'),
                'email'    => $this->request->getVar('email'),
                'password' => password_hash($this->request->getVar('password'), PASSWORD_DEFAULT),
                'disabled' => 'true',
                'activaion_key' => substr("abcdefghijklmnopqrstuvwxyz", mt_rand(0, 25), 1).substr(md5(time()), 1),
            ];
            
            //print_r( $data);    //debug
            $model->insert($data);
            $data['msg']="Account created, activate and login";
            echo view('awsome_signin', $data);
            //return redirect()->to('/login');
        }else{
            $data['validation'] = $this->validator;
            echo 'validaion err';       //debug
            echo print_r($data['validation']);      //debug
           // echo view('awsome_signup', $data);
        }
          
    }


    public function confirmation()
    {
        // Generate a unique activation code and set an expiration time, e.g., one day.
        // Save the user record into the database and mark the user’s status as inactive. Also, save the hash of the activation code & expiration time.
        // Send an email with the activation link to the user’s email address. The activation link will contain the email address and activation code, e.g., https://app.com/activate.php?email=email&activation_code=abcd
        // Inform the user to activate the account via email.


    }
  
}