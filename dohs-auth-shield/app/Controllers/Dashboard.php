<?php 
//this page is the main page of the app, and we want our users only to access this page 
//when they are logged in.
//Create RouteFilter.php inside the app/Filters folder.


namespace App\Controllers;  
use App\Models\Product;
use App\Models\Kpi;
use App\Models\Db;
use App\Models\Qos;
use App\Models\UserModel;
use CodeIgniter\Controller;
use App\Helpers\Functions;
//Auth
use CodeIgniter\Shield\Entities\User;

  //Naming convention: start with capital then rest smallcase
class Dashboard extends BaseController
{
     public $product = NULL;
     public $kpi = NULL;
     public $db = NULL;
     public $data= array();
     public $session = NULL;

     public function security(){
        //comment out or delete this security bootstrap code

        //1. first delete existing users
        try {
            $users = model('UserModel');
            $user  = $users->findById(1);
            $users->delete($user->id, true);
            $user  = $users->findById(2);
            $users->delete($user->id, true);
        } catch (\Throwable $th) {
            //throw $th;
        }

        //2. Add new users
        $users = model('UserModel');
        $user = new User([
            'username' => 'admin@keminsoft.com',
            'email'    => 'admin@keminsoft.com',
            'password' => 'qosqoe@2022',
        ]);
        $users->save($user);
        $user = $users->findById($users->getInsertID());// To get the complete user object with ID, we need to get from the database
        $users->addToDefaultGroup($user);// Add to default group
       
        $user->addGroup('admin', 'superadmin'); //add to super admin

        //modify users
        //$user  = $users->findById(1);
        //$users->delete($user->id, true);
        // $user->fill([
        //     'username' => 'JoeSmith111',
        //    'email' => 'joe.smith@example.com',
        //    'password' => 'secret123'
        //]);
        //$users->save($user);
        echo "Done";
    }

     public function __construct(){
       global $session;
       $this->session = session();
       $this->data['session_name'] = $this->session->get('name');

       //get dashboard data
       $dash = new Db('kpis', 'id', ['id']);
       $dash_values=$dash->getDashboard();
       
       //init
       $this->data ['sales']=500;
       $this->data ['budget'] = 'N742,600';
       $this->data ['clients']=23;
       $this->data ['income']='N32,800';
       $this->data ['kpis']='23';

       //get vals rom db
       $this->data ['sales']=$dash_values['sales'];
       $this->data ['clients']=$dash_values['clients'];
       $this->data ['qos_data']=$dash_values['qos_data'];
       $this->data ['qoe_data']=$dash_values['qoe_data'];
       $this->data ['kpis']=$dash_values['kpis'];
       $this->data ['labels']=$dash_values['labels'];
       $this->data ['datas']=$dash_values['datas'];
       $this->data ['labels_weeks']=$dash_values['labels_weeks'];
       $this->data ['datas_successful_calls']=$dash_values['datas_successful_calls'];
       $this->data ['datas_blocked_calls']=$dash_values['datas_blocked_calls'];
       $this->data ['datas_ccr']=$dash_values['datas_ccr'];
       $this->data ['datas_dialed']=$dash_values['datas_dialed'];

       $this->data ['datas_donut']=$dash_values['datas_donut'];




       $this->data ['data_chart_clients']=[0,0,0,9,23,79,89,80,90,20];
       $this->data ['data_chart_jobs']=[0,0,0,9,23,79,89,80,90,90];
       $this->data ['data_chart_worth']=[100,0,0,9,23,79,89,80,90,90];
       $this->data ['data_chart_sales']=[290,0,0,9,23,79,89,80,90,90];        
    }

    public function index(){
        //only priviledged users
        $user = auth()->user();
        if (auth()->loggedIn()) {
            if (! $user->inGroup('superadmin', 'admin')) { //or    ! auth()->user()->can('users.create'
                return redirect()->to('/login'); // Works
                //return redirect()->back()->with('error', 'You do not have permissions to access that page.');
            }
        } else if(!auth()->loggedIn()) {
            return redirect()->to('/login'); // Works
        }
        $this->data['session_name'] =auth()->id();
       
       

        return view('awesome_dashboard', $this->data);
    }
    public function register(){
        //only priviledged users
        $user = auth()->user();
        auth()->logout();
        auth()->forget();

        return redirect()->to('/register'); // Works
    }
    public function kpis(){   
        return view('awesome_kpis', $this->data);
    }

    
    public function qos_summary(){
        $controller_name='qos_data';
        $table_name=$controller_name;
        
        //get query builder
        $qosModel = new  Qos();
        $this->data['fields_short'] =  $qosModel->get_fields(); //  ['id', 'job_type_idr', 'name_of_parts_changed', 'quantity', 'unit_price', 'total_cost', 'name_of_parts_dealer', 'phone', 'bank_account_number', 'bank_acount_name', 'bank', 'voucher_number', 'created_at', 'pending'];
        $this->data['fields'] = $qosModel->get_fields();
        $builder = $qosModel->builder();
        $builder->selectCount('phone_id');
        $query = $builder->get();
        $this->data['table_rows'] = $query->getResult();        
        $my_sql_query = 'SELECT `date`, `time`, `particulars`, AVG(`value`) as value,`kpi_name`, `phone_id`, `phone_number`, `data_type` FROM `qos_data` WHERE `data_type` = "QoS" AND  `kpi_name` != "Default KPI" GROUP BY `date`, `kpi_name` ORDER BY `time` DESC';
        $db      = \Config\Database::connect();
        $query = $db->query($my_sql_query); 
        $ret_val = array();
        foreach ($query->getResult() as $row) {
            //calc time
            $date = strtotime($row->date." ".$row->time); //("2022-01-01 12:00:00"); // Replace with your date timestamp
            $date_ago = time_ago($date); //"ago---";  //
            //'date_ago' => $date_ago,
            $data = array(
                'date' => $row->date,
                'time' => $row->time,
                'particulars' => $row->particulars,
                'data_type' => $row->data_type,
                'value' => $row->value,
                'kpi_name' => $row->kpi_name,
                'phone_id' => $row->phone_id,
                'phone_number' => $row->phone_number,
                'date_ago' => $date_ago,
            );
            array_push($ret_val, $data);
        }

        $this->data['table_rows']=$ret_val;
        return view('awesome_qos_summary', $this->data);
    }

    public function qoe_summary(){
        $controller_name='qoe_data';
        $table_name=$controller_name;
        
        //get query builder
        $qosModel = new  Qos();
        $this->data['fields_short'] =  $qosModel->get_fields(); //  ['id', 'job_type_idr', 'name_of_parts_changed', 'quantity', 'unit_price', 'total_cost', 'name_of_parts_dealer', 'phone', 'bank_account_number', 'bank_acount_name', 'bank', 'voucher_number', 'created_at', 'pending'];
        $this->data['fields'] = $qosModel->get_fields();
        $builder = $qosModel->builder();
        $builder->selectCount('phone_id');
        $query = $builder->get();
        $this->data['table_rows'] = $query->getResult();        
        $my_sql_query = 'SELECT `date`, `time`, `particulars`, AVG(`value`) as value,`kpi_name`, `phone_id`, `phone_number`, `data_type` FROM `qos_data` WHERE `data_type` = "QoE" AND  `kpi_name` != "Default KPI" GROUP BY `date`, `kpi_name`';
        $db      = \Config\Database::connect();
        $query = $db->query($my_sql_query); 
        $ret_val = array();
        foreach ($query->getResult() as $row) {
            $date = strtotime($row->date." ".$row->time); //("2022-01-01 12:00:00"); // Replace with your date timestamp
            $date_ago = time_ago($date); //"ago---";  //
            //'date_ago' => $date_ago,
            $data = array(
                'date' => $row->date,
                'time' => $row->time,
                'particulars' => $row->particulars,
                'data_type' => $row->data_type,
                'value' => $row->value,
                'kpi_name' => $row->kpi_name,
                'phone_id' => $row->phone_id,
                'phone_number' => $row->phone_number,
                'date_ago' => $date_ago,
            );
            array_push($ret_val, $data);
        }

        $this->data['table_rows']=$ret_val;
        return view('awesome_qos_summary', $this->data); //use same view as qos 
    }
    public function qos(){
        $controller_name='qos_data';
        $table_name=$controller_name;
        $m_table = new  Db($table_name,'id');
        $m_table=$m_table->get_table_object();
        $this->data['fields_short'] =  $m_table->get_fields(); //  ['id', 'job_type_idr', 'name_of_parts_changed', 'quantity', 'unit_price', 'total_cost', 'name_of_parts_dealer', 'phone', 'bank_account_number', 'bank_acount_name', 'bank', 'voucher_number', 'created_at', 'pending'];
        $this->data['fields'] = $m_table->get_fields();
        //$this->data['table_rows'] = $m_table->findAll()->where("data_type"=="QoS"); //todo check for null
        //$this->data['table_rows'] = $m_table->where('data_type', 'QoS')->findAll();
        $this->data['table_rows'] = $m_table
                                    ->where('data_type', 'QoS')
                                    ->where('kpi_name !=', 'Default KPI')
                                    ->orderBy('date', 'DESC')
                                    ->orderBy('time', 'DESC')
                                    ->findAll();
        $this->data['qoe_table_rows'] = $m_table->findAll(); //todo check for null
        return view('awesome_qos', $this->data);
    }
    public function qoe(){
        $controller_name='qos_data';
        $table_name=$controller_name;
        $m_table = new  Db($table_name,'id');
        $m_table=$m_table->get_table_object();
        $this->data['fields_short'] =  $m_table->get_fields(); //  ['id', 'job_type_idr', 'name_of_parts_changed', 'quantity', 'unit_price', 'total_cost', 'name_of_parts_dealer', 'phone', 'bank_account_number', 'bank_acount_name', 'bank', 'voucher_number', 'created_at', 'pending'];
        $this->data['fields'] = $m_table->get_fields();
        //$this->data['table_rows'] = $m_table->findAll()->where("data_type"=="QoS"); //todo check for null
        //$this->data['table_rows'] = $m_table->where('data_type', 'QoE')->findAll();
        $this->data['table_rows'] = $m_table
                                            ->where('data_type', 'QoE')
                                            ->where('kpi_name !=', 'Default KPI')
                                            ->orderBy('date', 'DESC')
                                            ->orderBy('time', 'DESC')
                                            ->findAll();
        $this->data['qoe_table_rows'] = $m_table->findAll(); //todo check for null
        //calls
        $this->data['calls_table_rows'] = $m_table->where('data_type', 'QoE')->where('kpi_name', 'Usability Call')
        ->orderBy('date', 'DESC')
        ->orderBy('time', 'DESC')
        ->findAll();
        $this->data['calls_qoe_table_rows'] = $m_table
        ->orderBy('date', 'DESC')
        ->orderBy('time', 'DESC')
        ->findAll();
        //sms
        $this->data['sms_table_rows'] = $m_table->where('data_type', 'QoE')->where('kpi_name', 'Usability SMS')
        ->orderBy('date', 'DESC')
        ->orderBy('time', 'DESC')
        ->findAll();
        $this->data['sms_qoe_table_rows'] = $m_table
        ->orderBy('date', 'DESC')
        ->orderBy('time', 'DESC')
        ->findAll(); //todo check for null
        return view('awesome_qoe', $this->data);
    }
    public function search(){

        // Get the search query from the input
        //$search_qos = $this->getGet('search_qos');
        $search_qos = $this->request->getVar('search_qos');
        $controller_name='qos_data';
        $table_name=$controller_name;
        $m_table = new  Db($table_name,'id');
        $m_table=$m_table->get_table_object();
        $this->data['fields_short'] =  $m_table->get_fields(); //  ['id', 'job_type_idr', 'name_of_parts_changed', 'quantity', 'unit_price', 'total_cost', 'name_of_parts_dealer', 'phone', 'bank_account_number', 'bank_acount_name', 'bank', 'voucher_number', 'created_at', 'pending'];
        $this->data['fields'] = $m_table->get_fields();
        //$this->data['table_rows'] = $m_table->findAll()->where("data_type"=="QoS"); //todo check for null
        //$this->data['table_rows'] = $m_table->where('data_type', 'QoS')->findAll();
        $this->data['table_rows'] = $m_table
                                    ->like('kpi_name', $search_qos)
                                    ->orderBy('date', 'DESC')
                                    ->orderBy('time', 'DESC')
                                    ->findAll();
        $this->data['qoe_table_rows'] = $m_table->findAll(); //todo check for null
        return view('awesome_qos', $this->data);
    }
    public function subscribers(){
        $controller_name='qos_data';
        $table_name=$controller_name;
        
        //get query builder
        $qosModel = new  Qos();
        $this->data['fields_short'] =  $qosModel->get_fields(); //  ['id', 'job_type_idr', 'name_of_parts_changed', 'quantity', 'unit_price', 'total_cost', 'name_of_parts_dealer', 'phone', 'bank_account_number', 'bank_acount_name', 'bank', 'voucher_number', 'created_at', 'pending'];
        $this->data['fields'] = $qosModel->get_fields();
        $builder = $qosModel->builder();
        $builder->selectCount('phone_id');
        $query = $builder->get();

        //$this->data['table_rows'] = $m_table->where('data_type', 'QoE')->findAll();
        $this->data['table_rows'] = $query->getResult();

        $my_sql_query = "SELECT `phone_id`, `phone_number` , `location_latitude`, `location_longitude` FROM `qos_data` GROUP BY `phone_id`";
        $db      = \Config\Database::connect();
        $query = $db->query($my_sql_query); 
        $ret_val = array();
        // foreach ($query->getResult() as $row) {
        //     //$ret_val['phone_id'] = $row->phone_id;
        //     //$ret_val['phone_number'] = $row->phone_number;
        // }
        foreach ($query->getResult() as $row) {
            $data = array(
                'phone_id' => $row->phone_id,
                'phone_number' => $row->phone_number,
                'location_latitude' => $row->location_latitude,
                'location_longitude' => $row->location_longitude
            );
            array_push($ret_val, $data);
        }

        $this->data['table_rows']=$ret_val;
        //returns
        //Array ( [0] => Array ( [phone_id] => 0 [phone_number] => 0 ) [1] => Array ( [phone_id] => AxyTPPPd [phone_number] => 09088899909 ) ) 


        return view('awesome_subscribers', $this->data);
    }

    public function profile()
    { 
        return view('awesome_profile', $this->data);
    }

    



    

    public function users()
    { 
        //$model_name='Task'; //$controller_name->trimright
        $controller_name='users'; // Db()->get_users_table_name;
       
        $table_name='users';
        $m_table = new  Db($table_name,'id');
        $this->data['fields_short'] =  ['id', 'username', 'active'];
        //method one call wrapped methods
        $this->data['fields'] = $m_table->get_table_fields(); // ['id', 'job_type_idr', 'name_of_parts_changed', 'quantity', 'unit_price', 'total_cost', 'name_of_parts_dealer', 'phone', 'bank_account_number', 'bank_acount_name', 'bank', 'voucher_number', 'created_at', 'pending'];
        $this->data['table_rows'] = $m_table->table_find_all(); 

        $this->data['table_name'] = $controller_name;
        $this->data['add_new_link'] = 'register';
        $this->data['controller_name'] = $controller_name;
        $this->data['update_controller_name'] = 'dashboard/users_update';
        $this->data['edit_controller_name'] = 'dashboard/users_edit';
        $this->data['make_admin_controller_name'] = 'dashboard/users_make_admin';
        $this->data['delete_controller_name'] = 'dashboard/users_delete';
        $this->data['add_controller_name'] = 'register';
        helper(['form']);
        return view('awesome_users_home', $this->data);
    }
    public function users_edit($id)
    { 
        $controller_name='users';
        $table_name=$controller_name;
        $m_table = new  Db($table_name,'id');
        $m_table=$m_table->get_table_object();
        $this->data['fields_short'] =  $m_table->get_fields(); //  ['id', 'job_type_idr', 'name_of_parts_changed', 'quantity', 'unit_price', 'total_cost', 'name_of_parts_dealer', 'phone', 'bank_account_number', 'bank_acount_name', 'bank', 'voucher_number', 'created_at', 'pending'];
        $this->data['fields'] = $m_table->get_fields();
        $this->data['table_rows'] = $m_table->findAll(); //todo check for null

        //$this->data['table_rows'] = $m_table->findAll(); //todo check for null
        $this->data['fields_short'] = $m_table->get_fields();  // ['id', 'job_type_idr', 'name_of_parts_changed', 'quantity', 'unit_price', 'total_cost', 'name_of_parts_dealer', 'created_at', 'pending'];
        $this->data['fields'] = $m_table->get_fields(); //  ['id', 'job_type_idr', 'name_of_parts_changed', 'quantity', 'unit_price', 'total_cost', 'name_of_parts_dealer', 'phone', 'bank_account_number', 'bank_acount_name', 'bank', 'voucher_number', 'created_at', 'pending'];
        $this->data['table_name'] = $table_name;
        $this->data['add_new_link'] = 'dashboard/generic_add/'.$controller_name;
        $this->data['controller_name'] = $controller_name;
        $this->data['create_controller_name'] = 'dashboard/generic_create/'.$controller_name;
        $this->data['update_controller_name'] = 'dashboard/users_update/'.$id;
        $this->data['edit_controller_name'] = 'dashboard/users_edit';
        $this->data['delete_controller_name'] = 'dashboard/users_delete';
        $this->data['add_controller_name'] = 'dashboard/generic_add/'.$controller_name;
        $this->data['home_controller_name'] = 'dashboard/users';
        $this->data['id'] = $id; // $this->request->getVar('id'); 
        $this->data['table_rows'] = $m_table->where('id', $this->data['id'] )->first();//todo check for null
        helper(['form']);
        return view('awesome_generic_edit', $this->data);
    }  

    function users_update($id){
        // //Auth update
        // $users = model('UserModel');
        // $user = new User([
        //     'username' => $this->request->getPost('username'),
        //     'email'    => $this->request->getPost('email'),
        //     'password' => $this->request->getPost('password'),
        // ]);
        // $users->save($user);

        //normal update

        $controller_name='users';
        $table_name=$controller_name;
        $m_table = new  Db($table_name,'id'); 
        $m_table=$m_table->get_table_object();
        $this->data['fields_short'] =  $m_table->get_fields(); //  ['id', 'job_type_idr', 'name_of_parts_changed', 'quantity', 'unit_price', 'total_cost', 'name_of_parts_dealer', 'phone', 'bank_account_number', 'bank_acount_name', 'bank', 'voucher_number', 'created_at', 'pending'];
        $this->data['fields'] = $m_table->get_fields();
        $this->data['home_controller_name'] = 'dashboard/users';
        $sample=[];
        //array_keys
        foreach ($this->data['fields'] as $key => $field):
            $sample[$key]=$this->request->getPost($field); //$field.'----';
        endforeach;

        $this->data_input=array_combine($this->data['fields'] , $sample); //keys,vals
         //print_r($this->data_input );
        // echo '</br>';

        $m_table->update($id, $this->data_input);
        return $this->response->redirect(site_url('/dashboard/users' ));
    }
    function users_delete($id){
        try {
            $users = model('UserModel');
            $user  = $users->findById($id);
            $users->delete($user->id, true);
        } catch (\Throwable $th) {
            //throw $th;
        } 
        return $this->response->redirect(site_url('/dashboard/users' ));   
    }
    function users_make_admin($id){
        try {
            $users = model('UserModel');
            $user  = $users->findById($id);
           
            $user->addGroup('admin', 'superadmin'); //add to super admin
        } catch (\Throwable $th) {
        }
        return $this->response->redirect(site_url('/dashboard/users' ));   
    }

    public function generic($controller_name)
    { 
        //$model_name='Task'; //$controller_name->trimright
        //$controller_name=$this->uri->segment(1);
        $table_name=$controller_name;
        $m_table = new  Db($table_name,'id');
        $this->data['fields_short'] =  $m_table->get_table_fields(); //  ['id', 'job_type_idr', 'name_of_parts_changed', 'quantity', 'unit_price', 'total_cost', 'name_of_parts_dealer', 'phone', 'bank_account_number', 'bank_acount_name', 'bank', 'voucher_number', 'created_at', 'pending'];
        //method one call wrapped methods
        $this->data['fields'] = $m_table->get_table_fields(); // ['id', 'job_type_idr', 'name_of_parts_changed', 'quantity', 'unit_price', 'total_cost', 'name_of_parts_dealer', 'phone', 'bank_account_number', 'bank_acount_name', 'bank', 'voucher_number', 'created_at', 'pending'];
        $this->data['table_rows'] = $m_table->table_find_all(); 
        //alternatively get undelying table (prefered)
        // $this->data['fields'] = $m_table->get_table_object()->get_fields();
        // $this->data['table_rows'] = $m_table->get_table_object()->findAll(); //todo check for null
        // print_r($this->data['table_rows'] );
        //print_r($this->data['fields_short']);
        //echo $table_name;
        //print_r($m_table);
        // return;
        $this->data['table_name'] = $controller_name;
        $this->data['add_new_link'] = 'dashboard/generic_add/'.$controller_name;
        $this->data['controller_name'] = $controller_name;
        $this->data['update_controller_name'] = 'dashboard/generic_update/'.$controller_name;
        $this->data['edit_controller_name'] = 'dashboard/generic_edit/'.$controller_name;
        $this->data['delete_controller_name'] = 'dashboard/generic_delete/'.$controller_name;
        $this->data['delete_controller_add'] = 'dashboard/generic_add/'.$controller_name;
        helper(['form']);
        return view('awesome_generic_home', $this->data);
    }

    public function generic_edit($controller_name,$id)
    { 
        $table_name=$controller_name;
        $m_table = new  Db($table_name,'id');
        $m_table=$m_table->get_table_object();
        $this->data['fields_short'] =  $m_table->get_fields(); //  ['id', 'job_type_idr', 'name_of_parts_changed', 'quantity', 'unit_price', 'total_cost', 'name_of_parts_dealer', 'phone', 'bank_account_number', 'bank_acount_name', 'bank', 'voucher_number', 'created_at', 'pending'];
        $this->data['fields'] = $m_table->get_fields();
        $this->data['table_rows'] = $m_table->findAll(); //todo check for null

        //$this->data['table_rows'] = $m_table->findAll(); //todo check for null
        $this->data['fields_short'] = $m_table->get_fields();  // ['id', 'job_type_idr', 'name_of_parts_changed', 'quantity', 'unit_price', 'total_cost', 'name_of_parts_dealer', 'created_at', 'pending'];
        $this->data['fields'] = $m_table->get_fields(); //  ['id', 'job_type_idr', 'name_of_parts_changed', 'quantity', 'unit_price', 'total_cost', 'name_of_parts_dealer', 'phone', 'bank_account_number', 'bank_acount_name', 'bank', 'voucher_number', 'created_at', 'pending'];
        $this->data['table_name'] = $table_name;
        $this->data['add_new_link'] = 'dashboard/generic_add/'.$controller_name;
        $this->data['controller_name'] = $controller_name;
        $this->data['create_controller_name'] = 'dashboard/generic_create/'.$controller_name;
        $this->data['update_controller_name'] = 'dashboard/generic_update/'.$controller_name.'/'.$id;
        $this->data['edit_controller_name'] = 'dashboard/generic_edit/'.$controller_name;
        $this->data['delete_controller_name'] = 'dashboard/generic_delete/'.$controller_name;
        $this->data['add_controller_name'] = 'dashboard/generic_add/'.$controller_name;
        $this->data['home_controller_name'] = 'dashboard/generic/'.$controller_name;
        $this->data['id'] = $id; // $this->request->getVar('id'); 
        $this->data['table_rows'] = $m_table->where('id', $this->data['id'] )->first();//todo check for null
        helper(['form']);
        return view('awesome_generic_edit', $this->data);
    }   
    public function generic_add($controller_name)
    { 
        $table_name=$controller_name;
        $m_table = new  Db($table_name,'id');
        $m_table=$m_table->get_table_object();
        $this->data['fields_short'] =  $m_table->get_fields(); //  ['id', 'job_type_idr', 'name_of_parts_changed', 'quantity', 'unit_price', 'total_cost', 'name_of_parts_dealer', 'phone', 'bank_account_number', 'bank_acount_name', 'bank', 'voucher_number', 'created_at', 'pending'];
        $this->data['fields'] = $m_table->get_fields();
        $id_field = array_shift($this->data['fields']); //remove id from the array
        $this->data['table_rows'] = $m_table->findAll(); //todo check for null

        //$this->data['table_rows'] = $m_table->findAll(); //todo check for null
        $this->data['fields_short'] = $m_table->get_fields();  // ['id', 'job_type_idr', 'name_of_parts_changed', 'quantity', 'unit_price', 'total_cost', 'name_of_parts_dealer', 'created_at', 'pending'];
        $this->data['fields'] = $m_table->get_fields(); //  ['id', 'job_type_idr', 'name_of_parts_changed', 'quantity', 'unit_price', 'total_cost', 'name_of_parts_dealer', 'phone', 'bank_account_number', 'bank_acount_name', 'bank', 'voucher_number', 'created_at', 'pending'];
        $this->data['table_name'] = $table_name;
        $this->data['add_new_link'] = 'dashboard/generic_add/'.$controller_name;
        $this->data['controller_name'] = $controller_name;
        $this->data['create_controller_name'] = 'dashboard/generic_create/'.$controller_name;
        // $this->data['update_controller_name'] = 'dashboard/generic_update/'.$controller_name.'/'.$id;
        $this->data['edit_controller_name'] = 'dashboard/generic_edit/'.$controller_name;
        $this->data['delete_controller_name'] = 'dashboard/generic_delete/'.$controller_name;
        $this->data['add_controller_name'] = 'dashboard/generic_add/'.$controller_name;
        $this->data['home_controller_name'] = 'dashboard/generic/'.$controller_name;
        // $this->data['id'] = $id; // $this->request->getVar('id'); 
        //$this->data['table_rows'] = $m_table->where('id', $this->data['id'] )->first();//todo check for null
        helper(['form']);
        return view('awesome_generic_add', $this->data);
    }     
    function generic_update($controller_name, $id){
        $table_name=$controller_name;
        $m_table = new  Db($table_name,'id'); 
        $m_table=$m_table->get_table_object();
        $this->data['fields_short'] =  $m_table->get_fields(); //  ['id', 'job_type_idr', 'name_of_parts_changed', 'quantity', 'unit_price', 'total_cost', 'name_of_parts_dealer', 'phone', 'bank_account_number', 'bank_acount_name', 'bank', 'voucher_number', 'created_at', 'pending'];
        $this->data['fields'] = $m_table->get_fields();
        $this->data['home_controller_name'] = 'dashboard/generic/'.$controller_name;
        $sample=[];
        //array_keys
        foreach ($this->data['fields'] as $key => $field):
            $sample[$key]=$this->request->getPost($field); //$field.'----';
        endforeach;

        $this->data_input=array_combine($this->data['fields'] , $sample); //keys,vals
         //print_r($this->data_input );
        // echo '</br>';

        $m_table->update($id, $this->data_input);
        return $this->response->redirect(site_url('/'.$this->data['home_controller_name'] ));
    }

    function generic_create($controller_name){
        $table_name=$controller_name;
        $m_table = new  Db($table_name,'id'); 
        $m_table=$m_table->get_table_object();
        $this->data['fields_short'] =  $m_table->get_fields(); //  ['id', 'job_type_idr', 'name_of_parts_changed', 'quantity', 'unit_price', 'total_cost', 'name_of_parts_dealer', 'phone', 'bank_account_number', 'bank_acount_name', 'bank', 'voucher_number', 'created_at', 'pending'];
        $this->data['fields'] = $m_table->get_fields();

        $id_field = array_shift($this->data['fields']); //remove id from the array
        $this->data['table_name'] = $table_name;
        $this->data['add_new_link'] = 'dashboard/generic_add/'.$controller_name;
        $this->data['controller_name'] = $controller_name;
        $this->data['create_controller_name'] = 'dashboard/generic_create/'.$controller_name;
        // $this->data['update_controller_name'] = 'dashboard/generic_update/'.$controller_name.'/'.$id;
        $this->data['edit_controller_name'] = 'dashboard/generic_edit/'.$controller_name;
        $this->data['delete_controller_name'] = 'dashboard/generic_delete/'.$controller_name;
        $this->data['add_controller_name'] = 'dashboard/generic_add/'.$controller_name;
        $this->data['home_controller_name'] = 'dashboard/generic/'.$controller_name;
        //$id = $this->request->getPost('id'); //$_POST['id'] // $this->request->getVar('id');
        $sample=[];
        //array_keys
        foreach ($this->data['fields'] as $key => $field):
            $sample[$key]=$this->request->getPost($field); //$field.'----';
        endforeach;
        $this->data_input=array_combine($this->data['fields'] , $sample); //keys,vals
        $m_table->insert( $this->data_input);
        return $this->response->redirect(site_url('/'.$this->data['home_controller_name'] ));
    }

    public function generic_delete($controller_name, $id) {
        $table_name=$controller_name;
        $m_table = new  Db($table_name,'id'); 
        $m_table=$m_table->get_table_object();

        $dummy_ret = $m_table->where('id', $id)->delete($id);
        return $this->response->redirect(site_url('/'.$controller_name));
    }


    


}

//end class


//fxns
function time_ago($timestamp) {
    $current_time = time();
    $time_difference = $current_time - $timestamp;
    
    // Calculate different time periods
    $seconds = $time_difference;
    $minutes = round($seconds / 60);           // value 60 is seconds
    $hours   = round($seconds / 3600);         // value 3600 is 60 minutes * 60 seconds
    $days    = round($seconds / 86400);        // value 86400 is 24 hours * 60 minutes * 60 seconds
    $weeks   = round($seconds / 604800);       // value 604800 is 7 days * 24 hours * 60 minutes * 60 seconds
    $months  = round($seconds / 2629440);      // value 2629440 is ((365+365+365+365+366)/5/12) days * 24 hours * 60 minutes * 60 seconds
    $years   = round($seconds / 31553280);     // value 31553280 is ((365+365+365+365+366)/5) days * 24 hours * 60 minutes * 60 seconds

    // Display the appropriate time format
    if ($seconds <= 60) {
        return "Just Now";
    } elseif ($minutes <= 60) {
        return ($minutes == 1) ? "1 minute ago" : "$minutes minutes ago";
    } elseif ($hours <= 24) {
        return ($hours == 1) ? "1 hour ago" : "$hours hours ago";
    } elseif ($days <= 7) {
        return ($days == 1) ? "1 day ago" : "$days days ago";
    } elseif ($weeks <= 4.3) {  // 4.3 == 30/7
        return ($weeks == 1) ? "1 week ago" : "$weeks weeks ago";
    } elseif ($months <= 12) {
        return ($months == 1) ? "1 month ago" : "$months months ago";
    } else {
        return ($years == 1) ? "1 year ago" : "$years years ago";
    }
}