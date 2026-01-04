<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Account;
use Illuminate\Support\Facades\Hash;

class AccountController extends Controller
{
    public function CreateNewAccount(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|unique:account,email', 
            'password' => 'required|string|min:8', 
        ]);

        // Hash password pre čuvanja
        $validated['password'] = Hash::make($validated['password']);

        $account = Account::create($validated);
           
        return response()->json([
            'success' => true,
            'message' => 'Account created successfully',
            'data' => $account 
        ], 201);
    }
}