<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// --- ADMIN/STORE ---
Route::prefix('admin/products')->group(function () {
    Route::post('/create', [ProductController::class, 'createNewProduct']);
    Route::get('/get', [ProductController::class, 'getAllProductsJSON']);
});