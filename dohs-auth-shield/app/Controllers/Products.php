<?php
namespace App\Controllers;
use App\Models\Product;
use App\Models\Service;
use CodeIgniter\Controller;

class Products extends BaseController
{
    public $product = NULL;
    public $data= array();
    public $session = NULL;
    
    public function __construct()
    {
      global $product , $data;
      $this->product = new Product();
      $this->data['products'] = $this->product->orderBy('id')->findAll();
      $data['recent_products'] = $this->product->orderBy('id', 'DESC')->findAll(5);
      $this->service = new Service();
      $this->data['services'] = $this->service->orderBy('id')->findAll();  
      $this->session = session();
      $this->data['session_name'] = $this->session->get('name');
     }
    public function index()
    {
        //$service = new Service();
        //$data['services'] = $service->orderBy('id', 'DESC')->findAll();
        return view('portal_products_home', $this->data);
    }

    public function view($id) {
        $this->data['products'] = $this->service->where('id', $id)->first();     //only one
        $this->data['session_name'] = $this->session->get('name');  
        return view('portal_products_view', $this->data);
    }
    public function view_all() {
        $this->data['session_name'] = $this->session->get('name');  
        return view('portal_products_view', $this->data);
    }
        // show create product form
        public function add() {
            return view('portal_products_add', $this->data);
        }
        public function decrement($id) {
            $this->product->decrement_quantity($id);
            return view('portal_products_home', $this->data);
        }
    
        // save Product data
        public function store() {
            $product_l = new Product();
            // $fields=$product_l->get_fields();
            // foreach($this->fields as $key): 
            //     $data_input[$key]=$this->request->getPost($key);
            // endforeach;
            $data_input = [
                'name' => $this->request->getPost('name'),
                'price'  => $this->request->getPost('price'),
                'description'  => $this->request->getPost('description'),
                'quantity'  => $this->request->getPost('quantity')
            ];
            $product_l->insert($data_input);
            return $this->response->redirect(site_url('/products'));
        }
    
        // show product
        public function edit($id) {
            //$product = new Product();
            $this->data['product'] = $this->product->where('id', $id)->first();
            helper(['form']);
            return view('portal_products_edit', $this->data);
        }
    
     // update product data
     public function update() {
        $product = new Product(); 
        $this->data_input = [
            'id' => $this->request->getPost('id'),
            'name' => $this->request->getPost('name'),
            'title'  => $this->request->getPost('title'),
            'price'  => $this->request->getPost('price'),
            'description'  => $this->request->getPost('description'),
            'quantity'  => $this->request->getPost('quantity')
        ];
        // $sample=[];
        // //array_keys
        // $this->data['fields']=$product->get_feilds();
        // $l = count($this->data['fields']);
        // foreach ($this->data['fields'] as $key => $field):
        //     $sample[$key]=$this->request->getPost($field); //$field.'----';
        // endforeach;
        // $this->data_input=array_combine($this->data['fields'] , $sample); //keys,vals
        
        
        $id=$this->request->getPost('id');
        try {
            $this->data['msg']='Something may have gone wrong';
            $product->update($id, $this->data_input);
            $this->data['msg']='Product saved to database successfully';
            return $this->response->redirect(site_url('/products'));
        } catch (Throwable $th) {
            //throw $th;
            //echo $th;
            return $this->response->redirect(site_url('/products?msg=error'));
        }
    }
    
        // delete product
        public function delete($id) {
            $product = new Product();
            $data['product'] = $product->where('id', $id)->delete($id);
            return $this->response->redirect(site_url('/products'));
        }

        
    }
      
