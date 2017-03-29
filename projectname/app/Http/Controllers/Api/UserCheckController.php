<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Encryption\Encrypter;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserCheckController extends Controller
{
    public function index(Request $request, Application $app)
    {
        $x_auth_session = $_SERVER['HTTP_X_AUTH_SESSION'] ?? $_REQUEST['x_auth_session'] ?? null;

        return [
            'user_id' => Auth::id(),
            'session.id' => Session()->getId(),
            '------------------------'  => '----------------------------',
            'cookie.laravel_session' => $_COOKIE['laravel_session'] ?? null,
            'custom.laravel_session' => $app->make(Encrypter::class)->encrypt(Session()->getId()),
            'x_auth_session' => $x_auth_session,
            '+-----------------------'  => '----------------------------',
            'session.token' => Session()->get('_token'),
            'cookie' => $request->cookie(),

            //->
        ];
    }
}
