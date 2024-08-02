<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class Invoice extends Seeder
{
    public function run()
    {
        $invoice=[
            'name' => "Ed",
            'name'       => "Val",
            'address1'         => "KeminSoft Ltd",
            'address2' => "Kemin Street, Benin City",
            'address3'         => "234 456 5678, kemin@gmail.com",
            'date'    => "March 15, 2022",
            'due_date'     => "Val",
            'car_model'         => "Val",
            'mileage'         => "Val",
            'client_idr'         => "Val",
            'car_reg'         => "Val",
            'item1'         => "Val",
            'item2'         => "Val",
            'item3'         => "Val",
            'item4'         => "Val",
            'item5'         => "Val",
            'qty1'         => "Val",
            'qty2'         => "Val",
            'qty3'         => "Val",
            'qty4'         => "Val",
            'qty5'         => "Val",
            'price1'         => "Val",
            'price2'         => "Val",
            'price3'         => "Val",
            'price4'         => "Val",
            'price5'         => "Val",
            'discount'         => "Val",
            'subtotal'         => "Val",
            'tax'         => "Val",
            'total'         => "Val",
        ];
        $this->db->table('invoices')->insert($invoice);
    }
}
