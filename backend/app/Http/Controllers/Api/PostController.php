<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $query = Post::with('category')
            ->whereNotNull('published_at')
            ->orderByDesc('published_at');

        if ($request->filled('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('excerpt', 'like', "%{$search}%")
                    ->orWhere('content', 'like', "%{$search}%");
            });
        }

        if ($request->filled('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        return response()->json($query->get());
    }

    public function show(string $slug)
    {
        $post = Post::with('category')
            ->where('slug', $slug)
            ->whereNotNull('published_at')
            ->firstOrFail();

        return response()->json($post);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'category_id' => ['nullable', 'exists:categories,id'],
            'title' => ['required', 'string', 'max:255'],
            'excerpt' => ['required', 'string'],
            'content' => ['required', 'string'],
            'image' => ['nullable', 'string'],
            'published_at' => ['nullable', 'date'],
        ]);

        $data['slug'] = Str::slug($data['title']);

        $post = Post::create($data);

        return response()->json([
            'message' => 'Article créé avec succès.',
            'post' => $post->load('category'),
        ], 201);
    }

    public function update(Request $request, Post $post)
    {
        $data = $request->validate([
            'category_id' => ['nullable', 'exists:categories,id'],
            'title' => ['required', 'string', 'max:255'],
            'excerpt' => ['required', 'string'],
            'content' => ['required', 'string'],
            'image' => ['nullable', 'string'],
            'published_at' => ['nullable', 'date'],
        ]);

        $data['slug'] = Str::slug($data['title']);

        $post->update($data);

        return response()->json([
            'message' => 'Article modifié avec succès.',
            'post' => $post->fresh()->load('category'),
        ]);
    }

    public function destroy(Post $post)
    {
        $post->delete();

        return response()->json([
            'message' => 'Article supprimé avec succès.',
        ]);
    }
}