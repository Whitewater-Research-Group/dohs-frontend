<?php 

namespace App\Models;
use CodeIgniter\Model;

class UserModelApp extends Model
{
    protected $table = 'users';
    protected $primaryKey = 'id';
    protected $allowedFields  = [
        'username',
        'status',
        'status_message',
        'active',
        'last_active',
        'created_at',
        'updated_at',
        'deleted_at',
    ];
    function get_fields(){
      return $this->allowedFields;
    }
    function does_user_exist($email){
      return false;
  }
}