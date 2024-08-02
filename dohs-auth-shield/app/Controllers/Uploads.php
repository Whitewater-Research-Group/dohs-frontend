<?php
namespace App\Controllers;

use CodeIgniter\Files\File;
use App\Models\Product;
use App\Models\Gallery;
use CodeIgniter\Controller; //ci4 way

class Uploads extends BaseController{
 

 
    protected $helpers = ['form'];

    public function index()
    {
        $upload = new Gallery();
        $data['uploads'] = $upload->orderBy('id', 'DESC')->findAll();
        //return view('portal_upload', $data);
        $data['errors'] = [];
        return view('portal_gallery_upload', $data);    //['errors' => []]);
    }
    public function view_gallery()
    {
        $upload = new Gallery();
        $data['gallerys'] = $upload->orderBy('id', 'DESC')->findAll();
        //return view('portal_upload', $data);
        $data['errors'] = [];
        return view('portal_gallery_home', $data);    //['errors' => []]);
    }

    public function edit($id)
    {
        $gallery = new Gallery();
        $data['gallerys'] = $gallery->where('id', $id)->first();
        $data['errors'] = [];
        return view('portal_gallery_edit', $data);
    }
    public function upload()
    {
        $validationRule = [
            'userfile' => [
                'label' => 'Image File',
                'rules' => 'uploaded[userfile]'
                    . '|is_image[userfile]'
                    . '|mime_in[userfile,image/jpg,image/jpeg,image/gif,image/png,image/webp]'
                    . '|max_size[userfile,100]'
                    . '|max_dims[userfile,1024,768]',
            ],
        ];
        if (! $this->validate($validationRule)) {
            $data = ['errors' => $this->validator->getErrors()];

            return view('portal_gallery_upload', $data);
        }

        $img = $this->request->getFile('userfile');

        if (! $img->hasMoved()) {
            $filepath = WRITEPATH . 'uploads/' . $img->store();

            $data = ['uploaded_flleinfo' => new File($filepath)];

            return view('portal_gallery_upload_success', $data);
        }
        $data = ['errors' => 'The file has already been moved.'];

        return view('portal_gallery_upload', $data);
    }
 
    //  function do_upload(){
    //     $config['upload_path']="./assets/img";
    //     $config['allowed_types']='gif|jpg|png';
    //     $config['encrypt_name'] = TRUE;
         
    //     $this->load->library('upload',$config);
    //     if($this->upload->do_upload("file")){
    //         $data = array('upload_data' => $this->upload->data());
 
    //         $title= $this->input->post('title');
    //         $image= $data['upload_data']['file_name']; 
             
    //         $result= $this->upload_model->save_upload($title,$image);
    //         echo json_decode($result);
    //     }
 
    //  }
     
}