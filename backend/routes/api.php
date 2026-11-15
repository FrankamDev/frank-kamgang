<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\ProjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// =========================
// PUBLIC
// =========================

Route::post('/login', [AuthController::class, 'login']);

Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{post}', [PostController::class, 'show']);

Route::get('/categories', [CategoryController::class, 'index']);

Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{slug}', [ProjectController::class, 'show']);


// =========================
// ADMIN
// =========================

Route::middleware(['auth:sanctum', 'admin'])->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    // Posts
    Route::post('/admin/posts', [PostController::class, 'store']);
    Route::put('/admin/posts/{post}', [PostController::class, 'update']);
    Route::delete('/admin/posts/{post}', [PostController::class, 'destroy']);

    // Categories
    Route::post('/admin/categories', [CategoryController::class, 'store']);
    Route::put('/admin/categories/{category}', [CategoryController::class, 'update']);
    Route::delete('/admin/categories/{category}', [CategoryController::class, 'destroy']);

    // Projects
    Route::post('/admin/projects', [ProjectController::class, 'store']);
    Route::put('/admin/projects/{project}', [ProjectController::class, 'update']);
    Route::delete('/admin/projects/{project}', [ProjectController::class, 'destroy']);

    });
    // User
   Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});