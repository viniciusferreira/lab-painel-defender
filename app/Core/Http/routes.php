<?php
Route::get('', ['uses' => 'HomeController@index', 'as' => 'home']);
Route::controller('auth', 'Auth\AuthController');
Route::controller('password', 'Auth\PasswordController');
