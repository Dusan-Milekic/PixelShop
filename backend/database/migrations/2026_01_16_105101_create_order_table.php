<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('order', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->foreign()->references('id')->on('account')->onDelete('cascade');
            $table->decimal('total_amount', 10, 2);
            $table->decimal('price', 10, 2);
            $table->string('First_Name');
            $table->string('Last_Name');
            $table->string('Email');
            $table->string('Address');
            $table->string('City');
            $table->string('Zipcode');
            $table->string('Country');
            $table->string('Phone_Number');
            $table->string('Payment_Method');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order');
    }
};
