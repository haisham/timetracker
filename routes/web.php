<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('/api', function () {
    return view('welcome');
});

Route::get('/api/projects', 'ProjectsController@index');
Route::post('/api/add-project', 'ProjectsController@createProject');
Route::put('/api/close-project/{id}', 'ProjectsController@completeProject');
Route::put('/api/open-project/{id}', 'ProjectsController@incompleteProject');
Route::post('/api/add-entry/{id}','ProjectsController@addEntry');
Route::delete('/api/entry/{id}','ProjectsController@deleteEntry');