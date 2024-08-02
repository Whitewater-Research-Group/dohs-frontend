<?php
namespace App\Models;
use CodeIgniter\Model;

class Db extends Model

{
    protected $table = NULL;
    protected $primaryKey = NULL;
    protected $allowedFields = NULL;
    protected $useAutoIncreament = true;
    protected $db_models = [];
    // protected $table = 'products';
    // protected $primaryKey = 'id';
    
    public function __construct($table_name,$pri_key)
    {
        $this->table = $table_name;
        $this->primaryKey = $pri_key;
        $this->useAutoIncreament = true;
        $this->allowedFields = ['id'];
        $this->db_models = [];
        $this->db_models['users']= new UserModelApp;
        $this->db_models['users_auth']= new UserModel;
        $this->allowedFields=$this->db_models[$this->table]->get_fields();


    }
    public function get_users_table_name(){
        return 'users';
    }
    public function get_products_table_name(){
        return 'products';
    }
    public function get_table_fields()
    {
        $this->allowedFields=$this->db_models[$this->table]->get_fields();
        //one line above equivalent to many lines below
        // if ($this->table=="Products")   $this->allowedFields =$product->get_fields();
        // else if ($this->table=="Tasks")  $this->allowedFields =$product->get_fields();
        return $this->allowedFields;
    }

    public function table_find_all()
    {
        return $this->db_models[$this->table ]->findAll();
    }

    public function get_table_object()
    {
        return $this->db_models[$this->table];
    }
    function getInventory($product_id){
        $ret_val="List of all inventory in db: ";
        $db      = \Config\Database::connect();
        $builder = $db->table('inventory');
        $builder->select('*');
        $builder->join('products', 'products.id = inventory.item');
        //$builder->where('type', 1);// Produces: WHERE type = 1
        $query = $builder->get();
        //Produces: SELECT * FROM inventory JOIN products ON products.id = blogs.item

        foreach ($query->getResult() as $row) {
            $ret_val = $ret_val.",".$row->item."->".$row->name;;
        }
        return $ret_val;
    }

  
    function getDashboard(){
        $ret_val['sales']="Sales ";
        $db      = \Config\Database::connect();
        // $query = $db->query('SELECT sum(balance) as bal FrOM inventory');
        // foreach ($query->getResult() as $row) {
        //     $ret_val['sales'] = "N".number_format($row->bal,2);
        // }
        $ret_val['sales'] = "N".number_format(123.223445,2);
    
        $query = $db->query('SELECT count(id) as bal FrOM kpis'); 
        foreach ($query->getResult() as $row) {
            $ret_val['clients'] = $row->bal;
            $ret_val['kpis'] = $row->bal;
        }

        $query = $db->query('SELECT COUNT(DISTINCT phone_id) AS distinct_phone_ids, COUNT(DISTINCT phone_number) AS distinct_phone_numbers FROM qos_data;'); 
        foreach ($query->getResult() as $row) {
            $ret_val['qoe_data'] = $row->distinct_phone_ids;
            $ret_val['clients'] = $row->distinct_phone_ids;
            if ($ret_val['clients'] < $row->distinct_phone_numbers){
                $ret_val['clients'] = $row->distinct_phone_numbers;
            }
        }



        $query = $db->query('SELECT count(id) as bal FROM qos_data WHERE data_type="QoS"');
        foreach ($query->getResult() as $row) {
            $ret_val['qos_data'] = $row->bal;
        }

        $query = $db->query('SELECT count(id) as bal FrOM qos_data WHERE data_type="QoE"' );
        foreach ($query->getResult() as $row) {
            $ret_val['qoe_data'] = $row->bal;
        }


        $my_sql_query = 'SELECT `date`, AVG(`value`) as value FROM `qos_data` WHERE `data_type` = "QoS" AND  `kpi_name` = "SuccessfulCalls" GROUP BY `date`, `kpi_name` ORDER BY `time` DESC LIMIT 6';
        $result = $db->query($my_sql_query); 

        // Initialize arrays for labels and data
        $labels = [];
        $datas = [];
        if ($result->getNumRows() > 0) {
            // Output data of each row
            foreach ($result->getResultArray() as $row){
                $labels[] = $row["date"];
                $datas[] = $row["value"];
            }
        } else {
            // No results, set default labels and data
            $labels = ["No Data"];
            $datas = [0];
        }

        $ret_val['labels'] = json_encode($labels);
        $ret_val['datas'] = json_encode($datas);

        $my_sql_query = 'SELECT `date`, AVG(`value`) as value FROM `qos_data` WHERE `data_type` = "QoS" AND  `kpi_name` = "CCR" GROUP BY `date`, `kpi_name` ORDER BY `time` DESC LIMIT 6';
        $result = $db->query($my_sql_query); 

        // Initialize arrays for labels and data
        $labels = [];
        $datas = [];
        if ($result->getNumRows() > 0) {
            // Output data of each row
            foreach ($result->getResultArray() as $row){
                $labels[] = $row["date"];
                $datas[] = $row["value"];
            }
        } else {
            // No results, set default labels and data
            $labels = ["No Data"];
            $datas = [0];
        }

        $ret_val['labels_ccr'] = json_encode($labels);
        $ret_val['datas_ccr'] = json_encode($datas);



        // Get the last 7 days as labels
        $labels_weeks = [];
        for ($i = 6; $i >= 0; $i--) {
            $labels_weeks[] = date('Y-m-d', strtotime("-$i days"));
        }

        // Initialize arrays for data1 and data2
        $data1 = array_fill(0, 7, 0); // Default values for data1
        $data2 = array_fill(0, 7, 0); // Default values for data2
        $data_ccr = array_fill(0, 7, 0); // Default values for data2
        $data_dialed = array_fill(0, 7, 0); // Default values for data2
        // Prepare SQL queries
        $sql_data1 = 'SELECT `date`, AVG(`value`) as value FROM `qos_data`
                    WHERE `data_type` = "QoS" AND `kpi_name` = "SuccessfulCalls" 
                    AND `date` IN (' . implode(',', array_map(function($date) use ($db) {
                            return $db->escape($date);
                        }, $labels)) . ') 
                    GROUP BY `date`';

        $sql_data2 = 'SELECT `date`, AVG(`value`) as value FROM `qos_data`
                    WHERE `data_type` = "QoS" AND `kpi_name` = "BlockedCalls" 
                    AND `date` IN (' . implode(',', array_map(function($date) use ($db) {
                            return $db->escape($date);
                        }, $labels)) . ') 
                    GROUP BY `date`';
        $sql_data_ccr = 'SELECT `date`, AVG(`value`) as value FROM `qos_data`
                    WHERE `data_type` = "QoS" AND `kpi_name` = "CCR" 
                    AND `date` IN (' . implode(',', array_map(function($date) use ($db) {
                            return $db->escape($date);
                        }, $labels)) . ') 
                    GROUP BY `date`';
        $sql_data_dialed = 'SELECT `date`, AVG(`value`) as value FROM `qos_data`
                    WHERE `data_type` = "QoS" AND `kpi_name` != "DialedCall" 
                    AND `date` IN (' . implode(',', array_map(function($date) use ($db) {
                            return $db->escape($date);
                        }, $labels)) . ') 
                    GROUP BY `date`';
        // Execute queries and process results
        $query_data1 = $db->query($sql_data1);
        foreach ($query_data1->getResult() as $row) {
            $index = array_search($row->date, $labels);
            if ($index !== false) {
                $data1[$index] = $row->value;
            }
        }

        $query_data2 = $db->query($sql_data2);
        foreach ($query_data2->getResult() as $row) {
            $index = array_search($row->date, $labels);
            if ($index !== false) {
                $data2[$index] = $row->value;
            }
        }

        $query_data_ccr = $db->query($sql_data_ccr);
        foreach ($query_data_ccr->getResult() as $row) {
            $index = array_search($row->date, $labels);
            if ($index !== false) {
                $data_ccr[$index] = $row->value;
            }
        }

        $query_data_dialed = $db->query($sql_data2);
        foreach ($query_data_dialed->getResult() as $row) {
            $index = array_search($row->date, $labels);
            if ($index !== false) {
                $data_dialed[$index] = $row->value;
            }
        }

        // Convert data arrays to JSON for JavaScript
        $ret_val['labels_weeks'] = json_encode($labels_weeks);
        $ret_val['datas_successful_calls'] = json_encode($data1);
        $ret_val['datas_blocked_calls'] = json_encode($data2);
        $ret_val['datas_ccr'] = json_encode($data_ccr);
        $ret_val['datas_dialed'] = json_encode($data_dialed);

        $datas_donut = [$ret_val['clients'] , 160];
        $ret_val['datas_donut'] = json_encode($datas_donut);

        return $ret_val;
    } 
    

}