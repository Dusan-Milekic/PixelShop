<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class OrderController extends Controller
{
    //Create new order
    public function createNewOrder(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:account,id',
            'total_amount' => 'required|numeric',
            'price' => 'required|numeric',
            'First_Name' => 'required|string',
            'Last_Name' => 'required|string',
            'Email' => 'required|email',
            'Address' => 'required|string',
            'City' => 'required|string',
            'Zipcode' => 'required|string',
            'Country' => 'required|string',
            'Phone_Number' => 'required|string',
            'Payment_Method' => 'required|string',
        ]);

        $order = \App\Models\Order::create($validated);
        
        return response()->json([
            'success' => true,
            'message' => 'Order created successfully',
            'data' => $order
        ], 201);
    }
    public function getAllOrdersJson()
    {
        $orders = \App\Models\Order::all();
        return response()->json($orders);
    }
    public function getOrdersByUserId($userId)
    {
        $orders = \App\Models\Order::where('user_id', $userId)->get();
        return response()->json($orders);
    }
    
}
