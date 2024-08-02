<?php 

namespace App\Models;
use CodeIgniter\Model;
use CodeIgniter\Shield\Models\UserModel as AuthUserModel;

class UserModel extends AuthUserModel
{
    protected $table = 'users';
    protected $primaryKey = 'id';
    // protected $allowedFields = [
    //   'name',
    //   'email',
    //   'password',
    //   'title',
    //   'activation_key',
    //   'password_reset_key',
    //   'access_level',
    //   'disabled',
    //   'created_at'
    // ];
    function get_fields(){
      return $this->allowedFields;
    }
    function does_user_exist($email){
      return false;
  }
}