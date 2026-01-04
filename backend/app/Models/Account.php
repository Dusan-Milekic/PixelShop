<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    protected $table = 'account';

    protected $fillable = [
        'full_name',
        'email',
        'password'
    ];

    // Sakrij password u JSON response
    protected $hidden = ['password'];
}