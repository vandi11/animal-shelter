<?php

use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\AdoptionRequestController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PetController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/pets', [PetController::class, 'index']);
Route::get('/pets/{pet}', [PetController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'me']);

    Route::get('/profile', [ProfileController::class, 'show']);
    Route::post('/profile', [ProfileController::class, 'store']);
    Route::put('/profile', [ProfileController::class, 'update']);
    Route::patch('/profile', [ProfileController::class, 'update']);

    Route::post('/adoption-requests', [AdoptionRequestController::class, 'store']);
    Route::get('/my-adoption-requests', [AdoptionRequestController::class, 'myRequests']);
    Route::get('/adoption-requests/{adoptionRequest}', [AdoptionRequestController::class, 'show']);
    Route::patch('/adoption-requests/{adoptionRequest}', [AdoptionRequestController::class, 'update']);
    Route::delete('/adoption-requests/{adoptionRequest}', [AdoptionRequestController::class, 'destroy']);

    Route::middleware('admin')->group(function () {
        Route::post('/pets', [PetController::class, 'store']);
        Route::put('/pets/{pet}', [PetController::class, 'update']);
        Route::patch('/pets/{pet}', [PetController::class, 'update']);
        Route::delete('/pets/{pet}', [PetController::class, 'destroy']);

        Route::get('/adoption-requests', [AdoptionRequestController::class, 'index']);
        Route::get('/admin/users', [AdminUserController::class, 'index']);
        Route::get('/admin/users/{user}', [AdminUserController::class, 'show']);
        Route::patch('/admin/users/{user}', [AdminUserController::class, 'update']);
        Route::delete('/admin/users/{user}', [AdminUserController::class, 'destroy']);
    });
});
