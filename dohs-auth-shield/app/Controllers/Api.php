<?php 
//this page is the main page of the app, and we want our users only to access this page 
//when they are logged in.
//Create RouteFilter.php inside the app/Filters folder.


namespace App\Controllers;  
use App\Models\Product;
use App\Models\Kpi;
use App\Models\Qos;
use App\Models\Qoe;
use App\Models\Db;
use CodeIgniter\Controller;

  //Naming convention: start with capital then rest smallcase
class Api extends BaseController
{
     public $product = NULL;
     public $kpi = NULL;
     public $db = NULL;
     public $data= array();
     public $session = NULL;
     
     public function __construct()
     {
       global $product,$kpi, $data;
       $this->product = new Product();
       $this->data['products'] = $this->product->orderBy('id', 'DESC')->findAll();
       $this->kpi = new kpi();
       $this->data['kpis'] = $this->kpi->orderBy('id', 'DESC')->findAll();  
       $this->session = session();
       $this->data['session_name'] = $this->session->get('name');
      }
    public function index()
    {
        $str_doc  = "kpis: gets a list of all KPIs";
        $str_doc = $str_doc . '<br>'. "store_kpi: sores KPI";
        $str_doc = $str_doc . '<br>'. 'others: delete_kpi, store_qos_data';
        $this->data['api_doc'] = $str_doc;
        return view('home_api', $this->data);
    }
    public function doc()
    {
        $str_doc  = "kpis: gets a list of all KPIs";
        $str_doc = $str_doc . '<br>'. "store_kpi: sores KPI";
        $str_doc = $str_doc . '<br>'. 'others: delete_kpi, store_qos_data';
        $this->data['api_doc'] = $str_doc;
        return view('portal_api_doc.php', $this->data);
    }

    public function kpis()
    { 
        $kpi = new Kpi();
        $this->data['kpis'] = $kpi->findAll();
        $this->data['fields'] = $kpi->get_fields();// ['id','created_at','name','address','email','car_brand','car_model','car_model_year','vin_number','reg_number','phone','engine_type','engine_model_number','mileage'];
        //$this->data['data_types'] = ['int','date','string','string','string','string','string','string','string','string','string','string','string','string'];
        $json_data = array();//create the array 
        foreach($this->data['kpis']  as $key => $kpis_val):
            foreach($this->data['fields'] as $key_field => $field_val):
                $json_array[$field_val]= $kpis_val[$field_val];
            endforeach;
                array_push($json_data,$json_array);  //here pushing the values in to an array   
        endforeach;

       
        //todo: remove special chars
        //str = str.replaceAll(“[^a-zA-Z0-9]”, ” “);
        $db_data_json=json_encode($json_data,JSON_FORCE_OBJECT); //JSON_FORCE_OBJECT
        header('Content-Type: application/json');
        //return $this->response->setJSON($db_data_json); //this returns a valid JSON object {"0":{"id":"1","name":"Call Setup Success Rate (CSSR)",
        $db_data_json_aray=json_encode(($json_data)); // returns REST style JSON array [{"id":"1","name":"Call Setup Success Rate (CSSR)"
        return $this->response->setJSON($db_data_json_aray); 
    }

    public function store_kpi() {
        $kpi = new Kpi();
        //            'id' => $this->request->getPost('id'),
        $data = [
            'name' => $this->request->getPost('name'),
            'category'  => $this->request->getPost('category'),
            'typical_value'  => $this->request->getPost('typical_value'),
            'description'  => $this->request->getPost('description'),
            'short_description_1'  => $this->request->getPost('short_description_1'),
            'short_description_2'  => $this->request->getPost('short_description_2'),
            'short_description_3'  => $this->request->getPost('short_description_3'),
            'short_description_4'  => $this->request->getPost('short_description_4'),
            'short_description_5'  => $this->request->getPost('short_description_5')
        ];

        //hanndle nulls
        foreach($data  as $key => $kpis_val):
            if ($data[$key]==null) $data[$key]=0;
        endforeach;

        $kpi->insert($data);

        //now return all the kpis
        $this->data['kpis'] = $kpi->findAll();
        $this->data['fields'] = $kpi->get_fields();// ['id','created_at','name','address','email','car_brand','car_model','car_model_year','vin_number','reg_number','phone','engine_type','engine_model_number','mileage'];
        //$this->data['data_types'] = ['int','date','string','string','string','string','string','string','string','string','string','string','string','string'];
        $json_data = array();//create the array 
        foreach($this->data['kpis']  as $key => $kpis_val):
            foreach($this->data['fields'] as $key_field => $field_val):
                $json_array[$field_val]= $kpis_val[$field_val];
            endforeach;
                array_push($json_data,$json_array);  //here pushing the values in to an array   
        endforeach;
        //todo: remove special chars
        //str = str.replaceAll(“[^a-zA-Z0-9]”, ” “);
        $db_data_json=json_encode($json_data,JSON_FORCE_OBJECT); //JSON_FORCE_OBJECT
        header('Content-Type: application/json');
        //return $this->response->setJSON($db_data_json); //this returns a valid JSON object {"0":{"id":"1","name":"Call Setup Success Rate (CSSR)",
        $db_data_json_aray=json_encode(($json_data)); // returns REST style JSON array [{"id":"1","name":"Call Setup Success Rate (CSSR)"
       
            //todo: implement try catch always return valid json even on error return [{"id": 1, "name": "error"...}
        return $this->response->setJSON($db_data_json_aray); 

    }

    public function delete_kpi($id) {
        $m_table = new  Kpi(); 
        $dummy_ret = $m_table->where('id', $id)->delete($id);
        header('Content-Type: application/json');
        $db_data_json=json_encode('{"success": "true"}',JSON_FORCE_OBJECT); //todo: implement error
        return $this->response->setJSON($db_data_json); 
    }
    public function get_kpis(int $limit = 5, int $offset = 0)
    { 
        // http://example.com/api.php?offset=0&limit=10
        // You second request (triggered on scroll) would be:
        // http://example.com/api.php?offset=10&limit=10
        // You would append this ajax result to the existing list...
        // On the PHP side you want:
        // mysql_query("SELECT * FROM ... LIMIT $limit OFFSET $offset")

        $kpi = new Kpi();
        $this->data['kpis'] = $kpi->findAll($limit, $offset);
        $this->data['fields'] = $kpi->get_fields(); // ['id','created_at','name','address','email','car_brand','car_model','car_model_year','vin_number','reg_number','phone','engine_type','engine_model_number','mileage'];
        $this->data['data_types'] = ['int','date','string','string','string','string','string','string','string','string','string','string','string','string'];

        $json_data = array();//create the array 
        foreach($this->data['kpis']  as $key => $kpis_val):
            foreach($this->data['fields'] as $key_field => $field_val):
                $json_array[$field_val]= $kpis_val[$field_val];
            endforeach;
                array_push($json_data,$json_array);  //here pushing the values in to an array   
        endforeach;
        $db_data_json=json_encode($json_data, JSON_FORCE_OBJECT); 
        header('Content-Type: application/json');
        $db_data_json_aray=json_encode(($json_data)); // returns REST style JSON array [{"id":"1","name":"Call Setup Success Rate (CSSR)"
        return $this->response->setJSON($db_data_json_aray); 

    }

    /* -----------------------------------------------------*/
    /*                  Qos_Data                            */

    /* -----------------------------------------------------*/
    public function qos_data()
    { 
        $qos_data = new Qos();
        $this->data['qos_datas'] = $qos_data->findAll();
        $this->data['fields'] = $qos_data->get_fields();// ['id','created_at','name','address','email','car_brand','car_model','car_model_year','vin_number','reg_number','phone','engine_type','engine_model_number','mileage'];
        //$this->data['data_types'] = ['int','date','string','string','string','string','string','string','string','string','string','string','string','string'];
        $json_data = array();//create the array 
        foreach($this->data['qos_datas']  as $key => $qos_datas_val):
            foreach($this->data['fields'] as $key_field => $field_val):
                $json_array[$field_val]= $qos_datas_val[$field_val];
            endforeach;
                array_push($json_data,$json_array);  //here pushing the values in to an array   
        endforeach;
        $json_data_descending = array_reverse($json_data); //todo: modified march 18 2023
        //todo: remove special chars
        //str = str.replaceAll(“[^a-zA-Z0-9]”, ” “);
        //$db_data_json=json_encode($json_data_descending,JSON_FORCE_OBJECT); //JSON_FORCE_OBJECT
        header('Content-Type: application/json');
        //return $this->response->setJSON($db_data_json); //this returns a valid JSON object {"0":{"id":"1","name":"Call Setup Success Rate (CSSR)",
        $db_data_json_aray=json_encode(($json_data_descending)); // returns REST style JSON array [{"id":"1","name":"Call Setup Success Rate (CSSR)"
        return $this->response->setJSON($db_data_json_aray); 
    }
    public function qos_data_per_phone($phoneId)
    { 
        $qos_data = new Qos();
        $likeTerm = 'LIKE "%"'.$phoneId.'%"' ;
        $this->data['qos_datas'] = $qos_data->search_phone_id($phoneId); // $qos_data->where('particulars', $likeTerm)->findAll();
        $this->data['fields'] = $qos_data->get_fields();// ['id','created_at','name','address','email','car_brand','car_model','car_model_year','vin_number','reg_number','phone','engine_type','engine_model_number','mileage'];
        //$this->data['data_types'] = ['int','date','string','string','string','string','string','string','string','string','string','string','string','string'];
        $json_data = array();//create the array 
        foreach($this->data['qos_datas']  as $key => $qos_datas_val):
            foreach($this->data['fields'] as $key_field => $field_val):
                $json_array[$field_val]= $qos_datas_val[$field_val];
            endforeach;
                array_push($json_data,$json_array);  //here pushing the values in to an array   
        endforeach;
        $json_data_descending = array_reverse($json_data); //todo: modified march 18 2023
        //todo: remove special chars
        //str = str.replaceAll(“[^a-zA-Z0-9]”, ” “);
        //$db_data_json=json_encode($json_data_descending,JSON_FORCE_OBJECT); //JSON_FORCE_OBJECT
        header('Content-Type: application/json');
        $db_data_json_aray=json_encode(($json_data_descending)); // returns REST style JSON array [{"id":"1","name":"Call Setup Success Rate (CSSR)"
        return $this->response->setJSON($db_data_json_aray); 
    }

    public function store_qos_data() {
        $qos = new Qos();

        //properly handle date


        //error in datetime
        //$dDate = new DateTime($this->request->getPost('date'));
        //// format the DateTime object in MySQL date format
        //$mysql_date = $dDate->format('Y-m-d');

        //mth2
        //$mysql_date = date('Y-m-d', strtotime('2022-05-15'));
        //$mysql_date = date('Y-m-d', strtotime(dDate));


        // //mth3
        // $dateStr = "2023-04-23 13:45:00"; // assume this is the string date you want to save
        // // Create a DateTime object from the string date
        // $date = new DateTime($dateStr);
        // // Format the date to MySQL compatible format
        // $mysql_date = $date->format('Y-m-d H:i:s');


        $dDate = "2023-12-12"; //todo remove
        $dDate = $this->request->getPost('date');
        $mysql_date = date('Y-m-d', strtotime($dDate));

        $data = [
            'date' => $mysql_date,
            'time'  => $this->request->getPost('time'),
            'particulars'  => $this->request->getPost('particulars'),
            'value'  => $this->request->getPost('value'),
            'previous_value'  => $this->request->getPost('previous_value'),
            'data_type'  => $this->request->getPost('data_type'),
            'kpi_name'  => $this->request->getPost('kpi_name'),
            'kpi_idr'  => $this->request->getPost('kpi_idr'),
            'location_latitude' => $this->request->getPost('location_latitude'),
            'location_longitude' => $this->request->getPost('location_longitude')
        ];

        //hanndle nulls
        foreach($data  as $key => $qos_val):
            if ($data[$key]==null) $data[$key]=0;
        endforeach;

        $qos->insert($data);

        //now return all the qos
        $this->data['qos_data'] = $qos->findAll();
        $this->data['fields'] = $qos->get_fields();// ['id','created_at','name','address','email','car_brand','car_model','car_model_year','vin_number','reg_number','phone','engine_type','engine_model_number','mileage'];
        //$this->data['data_types'] = ['int','date','string','string','string','string','string','string','string','string','string','string','string','string'];
        $json_data = array();//create the array 
        foreach($this->data['qos_data']  as $key => $qos_val):
            foreach($this->data['fields'] as $key_field => $field_val):
                $json_array[$field_val]= $qos_val[$field_val];
            endforeach;
                array_push($json_data,$json_array);  //here pushing the values in to an array   
        endforeach;
        //todo: remove special chars
        //str = str.replaceAll(“[^a-zA-Z0-9]”, ” “);
        $db_data_json=json_encode($json_data,JSON_FORCE_OBJECT); //JSON_FORCE_OBJECT
        header('Content-Type: application/json');
        //return $this->response->setJSON($db_data_json); //this returns a valid JSON object {"0":{"id":"1","name":"Call Setup Success Rate (CSSR)",
        $db_data_json_aray=json_encode(($json_data)); // returns REST style JSON array [{"id":"1","name":"Call Setup Success Rate (CSSR)"
       
            //todo: implement try catch always return valid json even on error return [{"id": 1, "name": "error"...}
        return $this->response->setJSON($db_data_json_aray); 

    }

    public function store_qoe_data() {
        $qoe = new Qoe();
        
        //properly handle date

        $date = new DateTime($this->request->getPost('date'));

        // format the DateTime object in MySQL date format
        $mysql_date = $date->format('Y-m-d');

        // create a DateTime object using the date and time values from the form
        //$date_time = new DateTime($data['date'] . ' ' . $data['time']);
        // format the DateTime object in MySQL datetime format
        // $mysql_datetime = $date_time->format('Y-m-d H:i:s');
        // insert the datetime value into the database using a prepared statement
        // $stmt = $pdo->prepare("INSERT INTO my_table (datetime_column) VALUES (:datetime)");
        // $stmt->bindParam(':datetime', $mysql_datetime);
        // $stmt->execute();
        $data = [
            'date' => mysql_date,
            'time'  => $this->request->getPost('time'),
            'particulars'  => $this->request->getPost('particulars'),
            'value'  => $this->request->getPost('value'),
            'previous_value'  => $this->request->getPost('previous_value'),
            'data_type'  => $this->request->getPost('data_type'),
            'kpi_name'  => $this->request->getPost('kpi_name'),
            'kpi_idr'  => $this->request->getPost('kpi_idr'),
            'location_latitude' => $this->request->getPost('location_latitude'),
            'location_longitude' => $this->request->getPost('location_longitude')
        ];

        //hanndle nulls
        foreach($data  as $key => $qoe_val):
            if ($data[$key]==null) $data[$key]=0;
        endforeach;

        $qoe->insert($data);

        //now return all the qoe
        $this->data['qoe_data'] = $qoe->findAll();
        $this->data['fields'] = $qoe->get_fields();// ['id','created_at','name','address','email','car_brand','car_model','car_model_year','vin_number','reg_number','phone','engine_type','engine_model_number','mileage'];
        $json_data = array();//create the array 
        foreach($this->data['qoe_data']  as $key => $qoe_val):
            foreach($this->data['fields'] as $key_field => $field_val):
                $json_array[$field_val]= $qoe_val[$field_val];
            endforeach;
                array_push($json_data,$json_array);  //here pushing the values in to an array   
        endforeach;
        //todo: remove special chars
        //str = str.replaceAll(“[^a-zA-Z0-9]”, ” “);
        $db_data_json=json_encode($json_data,JSON_FORCE_OBJECT); //JSON_FORCE_OBJECT
        header('Content-Type: application/json');
        //return $this->response->setJSON($db_data_json); //this returns a valid JSON object {"0":{"id":"1","name":"Call Setup Success Rate (CSSR)",
        $db_data_json_aray=json_encode(($json_data)); // returns REST style JSON array [{"id":"1","name":"Call Setup Success Rate (CSSR)"
       
            //todo: implement try catch always return valid json even on error return [{"id": 1, "name": "error"...}
        return $this->response->setJSON($db_data_json_aray); 

    }
    //
    public function login()
    {
        $session = session();
        $model = new UserModel();

        $email = $this->request->getPost('email');
        $password = $this->request->getPost('password');
        
        $data = $model->where('email', $email)->first();
        
        if($data){
            $pass = $data['password'];
            $pwd_verify = password_verify($password, $pass);
            if($pwd_verify){
                $ses_data = [
                    'id' => $data['id'],
                    'name' => $data['name'],
                    'email' => $data['email'],
                    'isSignedIn' => TRUE
                ];

                $db_data_json=["status"=> "pass"];
                header('Content-Type: application/json');
                return $this->response->setJSON($db_data_json);
            }else{
                $db_data_json=["status"=> "fail wrong pass"];
                header('Content-Type: application/json');
                return $this->response->setJSON($db_data_json);
            }
        }else{
            $db_data_json=["status"=> "fail"];
            header('Content-Type: application/json');
            return $this->response->setJSON($db_data_json);
        }
    }

    public function register()
    {
        $session = session();
        $rules = [
            'email'         => 'required|min_length[4]|max_length[100]|valid_email|is_unique[users.email]',
            'password'      => 'required|min_length[4]|max_length[50]',
            'confirm_password'  => 'matches[password]'
        ];
          
        if($this->validate($rules)){
            $model = new UserModel();

            $data = [
                'name'     => 'sample name android',
                'email'    => $this->request->getVar('email'),
                'password' => password_hash($this->request->getVar('password'), PASSWORD_DEFAULT),
                'disabled' => 'true',
                'activaion_key' => substr("abcdefghijklmnopqrstuvwxyz", mt_rand(0, 25), 1).substr(md5(time()), 1),
            ];
            
            //print_r( $data);    //debug
            $model->insert($data);
            $db_data_json=["status"=> "pass"];
            header('Content-Type: application/json');
            return $this->response->setJSON($db_data_json);
        }else{
            $db_data_json=["status"=> "fail"];
            header('Content-Type: application/json');
            return $this->response->setJSON($db_data_json);
        }
          
    }
 
}