<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

use App\Http\Controllers\AccountController; 

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// --- ADMIN/STORE ---
Route::prefix('admin/products')->group(function () {
    Route::post('/create', [ProductController::class, 'createNewProduct']);
    Route::get('/get', [ProductController::class, 'getAllProductsJSON']);
});
Route::get('/accounts', [AccountController::class, 'getAllAccountsJSON']);
Route::post('/registration',[AccountController::class,'CreateNewAccount']);
Route::post('/signin',[AccountController::class,'SignIn']);

Route::prefix('orders')->group(function () {
    Route::post('/create', [\App\Http\Controllers\OrderController::class, 'createNewOrder']);
    Route::get('/get', [\App\Http\Controllers\OrderController::class, 'getAllOrdersJson']);
    Route::get('/user/{userId}', [\App\Http\Controllers\OrderController::class, 'getOrdersByUserId']);
});