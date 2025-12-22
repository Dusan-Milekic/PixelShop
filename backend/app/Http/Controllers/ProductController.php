<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function createNewProduct(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'description' => 'required|max:255',
            'price' => 'required|numeric',
            'stock_quantity' => 'required|integer',
            'image_url' => 'required|url'
        ]);

        $product = Product::create($validated);
        
        return response()->json([
            'success' => true,
            'message' => 'Product created successfully',
            'data' => $product
        ], 201);
    }
    
    public function getAllProductsJSON()
    {
        $products = Product::all();
        return response()->json($products);
    }
}