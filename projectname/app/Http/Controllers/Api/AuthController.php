<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function index(Request $request)
    {
        if (!Auth::attempt(
            [
                'email' => $request->get('email'),
                'password' => $request->get('password'),
            ],
            true
        )) {
            Auth::logout();
            return [
                'result' => false
            ];
        }

        return [
            'result' => true,
            'user_id' => Auth::id(),
            'user_name' => Auth::user()->name,
            'x_auth_token' => $request->session()->get('_token'),
        ];
    }
}
