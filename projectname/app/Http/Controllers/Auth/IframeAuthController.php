<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IframeAuthController extends Controller
{
    protected $redirectTo = '/home';

    //use AuthenticatesUsers;
    public function index(Request $request)
    {
        if (
            !Auth::attempt(
                [
                    'email' => $request->get('email'),
                    'password' => $request->get('password'),
                ],
                true
            )
        ) {
            return view('login');
        }
        return view('home');
    }
}
