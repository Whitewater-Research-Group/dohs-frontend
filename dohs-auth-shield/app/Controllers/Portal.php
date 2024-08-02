<?php 
//this page is the main page of the app, and we want our users only to access this page 
//when they are logged in.
//Create RouteFilter.php inside the app/Filters folder.


namespace App\Controllers;  
use App\Models\Product;
use App\Models\Gallery;
use App\Models\Job;
use App\Models\Inventorym;
use App\Models\Upload;
use App\Models\Task;
use App\Models\Db;
use App\Models\Vehicle_history;
use App\Models\Vehicle;
use App\Models\Account;
use App\Models\Attendance;
use App\Models\Kpi;
use CodeIgniter\Controller;
use CodeIgniter\Uri;

  //Naming convention: start with capital then rest smallcase
class Portal extends BaseController
{
     public $product = NULL;
     public $service = NULL;
     public $db = NULL;
     public $data= array();
     public $session = NULL;
     
    public function __construct()
    {
        global $product,$service, $data, $session;
        $this->product = new Product();
        $this->data['products'] = $this->product->orderBy('id', 'DESC')->findAll();
        $this->session = session();
        $this->data['session_name'] ='guest';
        $this->kpi = new Kpi();
        $this->data['kpis'] = $this->kpi->orderBy('id')->findAll(20); 

        //this is how to logi in $this->session->set_userdata('is_logged_in', TRUE);
    // check if user is logged in

        if($this->session->userdata!==null){
            if(! $this->session->get('is_logged_in')){
                return redirect()->to('/login');// user is not logged in then redirect user to any page you want
            }
        }else{
            return redirect()->to('/login'); //no session data at all
        }
    }
    public function index()
    {
        // echo "is logged in: ";
        // print_r($this->session->get('is_logged_in'));
        // echo "\n email: ";
        // print_r($this->session->get('email'));
        // return;
        return view('portal', $this->data);
    }
    public function invoices()
    { 
        $account = new Account();
        $this->data['account'] = $account->findAll();
        helper(['form']);
        return view('portal_invoice_home', $this->data);
    }
    public function cms()
    {
        $cms = new Db('cms', 'id', ['id']);
        $cms_content=$cms->getCMS();
        //$this->data['welcome']="Welcome to nEW MMLog autoFix </br> We offer cool services";
        //$this->data['welcome']=$cms_content['welcome'];
        $this->data['cms']=$cms_content;
        //array_push($this->data['cms'], $cms_content);
        //print_r ($this->data) ;     
        return view('portal_cms', $this->data);
    }  
    function cms_update(){
        $m_table =   new Db('cms', 'id', ['id']);
        $dFields = $m_table ->getCMSFields();
        $l = count($dFields);
        $sample=[];
        //array_keys
        foreach ($dFields as $key => $value_field):
            $sample[$key]=$this->request->getPost($value_field); //$field.'----';
        endforeach;
        print_r($sample );
        $this->data_input=array_combine($dFields , $sample); //keys,vals
        // print_r($this->data_input );
        // echo '</br>';
        $id=$this->request->getPost('id');
        $m_table->update($id, $this->data_input);
        return $this->response->redirect(site_url('/home'));
    }
    public function vehicle_history()
    { 
        $vehicle_history = new Job();
        $this->data['vehicle_history'] = $vehicle_history->findAll();
        helper(['form']);
        return view('portal_vehicle_history_home', $this->data);
    }

    public function vehicle_history_edit($id)
    { 
        $vehicle_history= new Job();
        $this->data['vehicle_history'] = $vehicle_history->where('id', $id)->first();
        $this->data['fields'] = $vehicle_history->get_fields(); // ['id', 'date', 'vehicle_idr', 'item', 'description'];
        $this->data['id']=$id;
        return view('portal_vehicle_history_edit', $this->data);
    }

    

    public function gallery()
    { 
        $gallery = new  Gallery();
        $this->data['gallerys'] = $gallery->findAll(); //todo check for null
        helper(['form']);
        return view('portal_gallery_home', $this->data);
    }


    private function populate_data($field_short, $fields, $table_name)
    {
        $this->data['fields_short'] = $field_short;
        $this->data['fields'] = $fields;
        $this->data['table_name'] = $table_name;
        $this->data['add_new_link'] = 'portal/vehicles_generic_add';
        $this->data['controller_name'] = 'vehicles';
        $this->data['update_controller_name'] = 'portal/'.data['update_controller_name'].'_generic_update';
        $this->data['edit_controller_name'] = 'portal/vehicles_generic_edit';
        $this->data['delete_controller_name'] = 'portal/vehicles_generic_delete';
        $this->data['add_controller_name'] = 'portal/vehicles_generic_add'; 
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
        $this->data['add_new_link'] = 'portal/generic_add/'.$controller_name;
        $this->data['controller_name'] = $controller_name;
        $this->data['update_controller_name'] = 'portal/generic_update/'.$controller_name;
        $this->data['edit_controller_name'] = 'portal/generic_edit/'.$controller_name;
        $this->data['delete_controller_name'] = 'portal/generic_delete/'.$controller_name;
        $this->data['delete_controller_add'] = 'portal/generic_add/'.$controller_name;
        helper(['form']);
        return view('generic_home', $this->data);
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
        $this->data['add_new_link'] = 'portal/generic_add/'.$controller_name;
        $this->data['controller_name'] = $controller_name;
        $this->data['create_controller_name'] = 'portal/generic_create/'.$controller_name;
        $this->data['update_controller_name'] = 'portal/generic_update/'.$controller_name.'/'.$id;
        $this->data['edit_controller_name'] = 'portal/generic_edit/'.$controller_name;
        $this->data['delete_controller_name'] = 'portal/generic_delete/'.$controller_name;
        $this->data['add_controller_name'] = 'portal/generic_add/'.$controller_name;
        $this->data['home_controller_name'] = 'portal/generic/'.$controller_name;
        $this->data['id'] = $id; // $this->request->getVar('id'); 
        $this->data['table_rows'] = $m_table->where('id', $this->data['id'] )->first();//todo check for null
        helper(['form']);
        return view('generic_edit', $this->data);
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
        $this->data['add_new_link'] = 'portal/generic_add/'.$controller_name;
        $this->data['controller_name'] = $controller_name;
        $this->data['create_controller_name'] = 'portal/generic_create/'.$controller_name;
        // $this->data['update_controller_name'] = 'portal/generic_update/'.$controller_name.'/'.$id;
        $this->data['edit_controller_name'] = 'portal/generic_edit/'.$controller_name;
        $this->data['delete_controller_name'] = 'portal/generic_delete/'.$controller_name;
        $this->data['add_controller_name'] = 'portal/generic_add/'.$controller_name;
        $this->data['home_controller_name'] = 'portal/generic/'.$controller_name;
        // $this->data['id'] = $id; // $this->request->getVar('id'); 
        //$this->data['table_rows'] = $m_table->where('id', $this->data['id'] )->first();//todo check for null
        helper(['form']);
        return view('generic_add', $this->data);
    }     
    function generic_update($controller_name, $id){
        $table_name=$controller_name;
        $m_table = new  Db($table_name,'id'); 
        $m_table=$m_table->get_table_object();
        $this->data['fields_short'] =  $m_table->get_fields(); //  ['id', 'job_type_idr', 'name_of_parts_changed', 'quantity', 'unit_price', 'total_cost', 'name_of_parts_dealer', 'phone', 'bank_account_number', 'bank_acount_name', 'bank', 'voucher_number', 'created_at', 'pending'];
        $this->data['fields'] = $m_table->get_fields();
        $this->data['home_controller_name'] = 'portal/generic/'.$controller_name;
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
        $this->data['add_new_link'] = 'portal/generic_add/'.$controller_name;
        $this->data['controller_name'] = $controller_name;
        $this->data['create_controller_name'] = 'portal/generic_create/'.$controller_name;
        // $this->data['update_controller_name'] = 'portal/generic_update/'.$controller_name.'/'.$id;
        $this->data['edit_controller_name'] = 'portal/generic_edit/'.$controller_name;
        $this->data['delete_controller_name'] = 'portal/generic_delete/'.$controller_name;
        $this->data['add_controller_name'] = 'portal/generic_add/'.$controller_name;
        $this->data['home_controller_name'] = 'portal/generic/'.$controller_name;
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