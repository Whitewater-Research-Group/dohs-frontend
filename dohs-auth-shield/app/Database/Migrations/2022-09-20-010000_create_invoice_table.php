<?php
namespace App\Database\Migrations;
use CodeIgniter\Database\Migration;

class CreateInvoiceTable extends Migration
{
    public function up(): void
    {
        // Users Table
        $this->forge->addField([
            'id'             => ['type' => 'int', 'constraint' => 11, 'unsigned' => true, 'auto_increment' => true],
            'name'       => ['type' => 'varchar', 'constraint' => 30, 'null' => true, 'default' => 0],
            'address1'         => ['type' => 'varchar', 'constraint' => 255, 'null' => true, 'default' => 0],
            'address2' => ['type' => 'varchar', 'constraint' => 255, 'null' => true, 'default' => 0],
            'address3'         => ['type' => 'varchar', 'constraint' => 255, 'null' => 0, 'default' => 0],
            'date'    => ['type' => 'datetime', 'null' => true],
            'due_date'     => ['type' => 'datetime', 'null' => true],
            'car_model'         => ['type' => 'varchar', 'constraint' => 255, 'null' => 0, 'default' => 0],
            'mileage'         => ['type' => 'varchar', 'constraint' => 255, 'null' => 0, 'default' => 0],
            'client_idr'         => ['type' => 'varchar', 'constraint' => 255, 'null' => 0, 'default' => 0],
            'car_reg'         => ['type' => 'varchar', 'constraint' => 255, 'null' => 0, 'default' => 0],
            'item1'         => ['type' => 'varchar', 'constraint' => 255, 'null' => 0, 'default' => 0],
            'item2'         => ['type' => 'varchar', 'constraint' => 255, 'null' => 0, 'default' => 0],
            'item3'         => ['type' => 'varchar', 'constraint' => 255, 'null' => 0, 'default' => 0],
            'item4'         => ['type' => 'varchar', 'constraint' => 255, 'null' => 0, 'default' => 0],
            'item5'         => ['type' => 'varchar', 'constraint' => 255, 'null' => 0, 'default' => 0],
            'qty1'         => ['type' => 'varchar', 'constraint' => 255, 'null' => 0, 'default' => 0],
            'qty2'         => ['type' => 'varchar', 'constraint' => 255, 'null' => 0, 'default' => 0],
            'qty3'         => ['type' => 'varchar', 'constraint' => 255, 'null' => 0, 'default' => 0],
            'qty4'         => ['type' => 'varchar', 'constraint' => 255, 'null' => 0, 'default' => 0],
            'qty5'         => ['type' => 'varchar', 'constraint' => 255, 'null' => 0, 'default' => 0],
            'price1'         => ['type' => 'varchar', 'constraint' => 255, 'null' => 0, 'default' => 0],
            'price2'         => ['type' => 'varchar', 'constraint' => 255, 'null' => 0, 'default' => 0],
            'price3'         => ['type' => 'varchar', 'constraint' => 255, 'null' => 0, 'default' => 0],
            'price4'         => ['type' => 'varchar', 'constraint' => 255, 'null' => 0, 'default' => 0],
            'price5'         => ['type' => 'varchar', 'constraint' => 255, 'null' => 0, 'default' => 0],
            'discount'         => ['type' => 'varchar', 'constraint' => 255, 'null' => 0, 'default' => 0],
            'subtotal'         => ['type' => 'varchar', 'constraint' => 255, 'null' => 0, 'default' => 0],
            'tax'         => ['type' => 'varchar', 'constraint' => 255, 'null' => 0, 'default' => 0],
            'total'         => ['type' => 'varchar', 'constraint' => 255, 'null' => 0, 'default' => 0],
           

        ]);
        $this->forge->addPrimaryKey('id');
        $this->forge->createTable('invoices', true);

    }

    //--------------------------------------------------------------------

    public function down(): void
    {
        $this->db->disableForeignKeyChecks();
        $this->forge->dropTable('invoices', true);

        $this->db->enableForeignKeyChecks();
    }
}
