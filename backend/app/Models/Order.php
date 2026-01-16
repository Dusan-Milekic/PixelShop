<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    
    protected $table = 'order';

    protected $fillable = [
        'user_id',
        'total_amount',
        'price',
        'First_Name',
        'Last_Name',
        'Email',
        'Address',
        'City',
        'Zipcode',
        'Country',
        'Phone_Number',
        'Payment_Method',
    ];
    
}
