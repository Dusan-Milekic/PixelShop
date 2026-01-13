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
   public function SignIn(Request $request)
{
    $credentials = $request->validate([
        'email' => 'required|email',
        'password' => 'required|string',
    ]);

    $account = Account::where('email', $credentials['email'])->first();

    if (!$account || !Hash::check($credentials['password'], $account->password)) {
        return response()->json([
            'success' => false,
            'message' => 'Invalid email or password',
        ], 401);
    }

    // Generiši token
    $token = bin2hex(random_bytes(32));

    return response()->json([
        'success' => true,
        'message' => 'Sign in successful',
        'token' => $token,
        'user' => [
            'id' => $account->id,
            'full_name' => $account->full_name,
            'email' => $account->email
        ]
    ], 200);
}
}