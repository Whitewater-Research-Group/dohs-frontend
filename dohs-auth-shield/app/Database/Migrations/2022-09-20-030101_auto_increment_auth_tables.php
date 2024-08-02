<?php
namespace App\Database\Migrations;
use CodeIgniter\Database\Migration;

class AutoIncrementAuthTables extends Migration
{
    public function up(): void
    {

        //add auto increment to all auth tables
        //'auto_increment' => true

        $fields = [
            'old_name' => [
                'name' => 'new_name',
                'type' => 'TEXT',
            ],
        ];
        $fields = [
            'id' => [
                'name' => 'id',
                'type' => 'int', 'constraint' => 11, 'unsigned' => true, 'auto_increment' => true
            ],
        ];
        $this->forge->modifyColumn('users', $fields);
        // gives ALTER TABLE `table_name` CHANGE `old_name` `new_name` ...
        $this->forge->modifyColumn('auth_groups_users', $fields);
        $this->forge->modifyColumn('auth_identities', $fields);
        $this->forge->modifyColumn('auth_logins', $fields);
        $this->forge->modifyColumn('auth_permissions_users', $fields);
        $this->forge->modifyColumn('auth_remember_tokens', $fields);
        $this->forge->modifyColumn('auth_token_logins', $fields);
    }

    //--------------------------------------------------------------------

    public function down(): void
    {
        $this->db->disableForeignKeyChecks();
        $fields = [
            'id' => [
                'name' => 'id',
                'type' => 'int', 'constraint' => 11, 'unsigned' => true, 'auto_increment' => false
            ],
        ];
        $this->forge->modifyColumn('users', $fields);
        // gives ALTER TABLE `table_name` CHANGE `old_name` `new_name` ...
        $this->forge->modifyColumn('auth_groups_users', $fields);
        $this->forge->modifyColumn('auth_identities', $fields);
        $this->forge->modifyColumn('auth_logins', $fields);
        $this->forge->modifyColumn('auth_permissions_users', $fields);
        $this->forge->modifyColumn('auth_remember_tokens', $fields);
        $this->forge->modifyColumn('auth_token_logins', $fields);

        $this->db->enableForeignKeyChecks();
    }
}
