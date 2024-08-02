<?php 

namespace App\Controllers;  
use CodeIgniter\Controller;
use App\Models\UserModel;
  

class Login extends Controller
{
    public $session = NULL;

    public function index()
    {
        helper(['form']);
        echo view('awesome_signin');
    } 
  
    public function signin($redirectTo="portal")
    {
        global  $session;
         $this->session = session();
         //$session = session();
        $model = new UserModel();

        $email = $this->request->getVar('email');
        $password = $this->request->getVar('password');
        
        $data = $model->where('email', $email)->first();
        
        if($data){
            $pass = $data['password'];
            $pwd_verify = password_verify($password, $pass);
            if($pwd_verify){
                $ses_data = [
                    'id' => $data['id'],
                    'name' => $data['name'],
                    'email' => $data['email'],
                    'is_logged_in' => TRUE
                ];
                $this->session->set($ses_data);
                $this->session->setFlashdata('msg', 'login sucessful <a href="'. site_url("dashboard").'">Go to Dashboard</a>');
                return redirect()->to('/login');
                return redirect()->to('/'.$redirectTo);
                
            }else{
                $this->session->setFlashdata('msg', 'wrong password.');
                return redirect()->to('/login');
            }
        }else{
            
            $this->session->setFlashdata('msg', 'wrong email.');
            return redirect()->to('/login');
        }
    }

    public function signout()
    {
        //$session = session();
        $this->session = session();
        //$ses_data=array('id','name','email','is_logged_in');
        if (null!==$this->session->ses_data)    $this->session->remove($ses_data);
       // $session->remove($is_logged_in);
        
       //$this->$session->unset_userdata(array('id','name','email','is_logged_in'));
       $this->session->destroy();
        return redirect()->to('/login');
    }

}