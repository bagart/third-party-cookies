<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $x_auth_session = $_SERVER['HTTP_X_AUTH_SESSION'] ?? $_REQUEST['x_auth_session'] ?? null;


        return [
            'user_id' => Auth::id(),
            'session.id' => Session()->getId(),
            'x_auth_session' => $x_auth_session,
            'cookie.laravel_session' => $_COOKIE['laravel_session'] ?? null,
            'session.token' => Session()->get('_token'),
            'session_all' => Session()->all(),

        ];
    }
}
