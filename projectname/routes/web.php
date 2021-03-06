<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Auth::routes();

Route::get('/', 'HomeController@index');



Route::get('/home', 'HomeController@index');


Route::get('/home', 'HomeController@index');

Route::any('/iframe_auth', 'Auth\IframeAuthController@index');


//x_auth section

Route::any('/api/auth', 'Api\AuthController@index');

//just for test
Route::any('/api/user_check', 'Api\UserCheckController@index');

//replace default
Route::post('/login', 'Auth\IframeAuthController@index');
