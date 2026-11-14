<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    /**
     * Liste des catégories
     */
    public function index()
    {
        $categories = Category::withCount('posts')
            ->orderBy('name')
            ->get();

        return response()->json($categories);
    }

    /**
     * Créer une catégorie
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                'unique:categories,name',
            ],
        ]);

        $category = Category::create([
            'name' => $data['name'],
            'slug' => $this->generateUniqueSlug($data['name']),
        ]);

        return response()->json([
            'message' => 'Catégorie créée avec succès.',
            'category' => $category->loadCount('posts'),
        ], 201);
    }

    /**
     * Modifier une catégorie
     */
    public function update(Request $request, Category $category)
    {
        $data = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                'unique:categories,name,' . $category->id,
            ],
        ]);

        $category->update([
            'name' => $data['name'],
            'slug' => $this->generateUniqueSlug(
                $data['name'],
                $category->id
            ),
        ]);

        return response()->json([
            'message' => 'Catégorie modifiée avec succès.',
            'category' => $category->fresh()->loadCount('posts'),
        ]);
    }

    /**
     * Supprimer une catégorie
     */
    public function destroy(Category $category)
    {
        /*
         * On empêche la suppression si des articles
         * utilisent encore cette catégorie.
         */
        if ($category->posts()->exists()) {
            return response()->json([
                'message' => 'Impossible de supprimer cette catégorie car elle contient encore des articles.',
            ], 422);
        }

        $category->delete();

        return response()->json([
            'message' => 'Catégorie supprimée avec succès.',
        ]);
    }

    /**
     * Générer un slug unique
     */
    private function generateUniqueSlug(
        string $name,
        ?int $ignoreId = null
    ): string {
        $baseSlug = Str::slug($name);
        $slug = $baseSlug;

        $query = Category::where('slug', $slug);

        if ($ignoreId !== null) {
            $query->where('id', '!=', $ignoreId);
        }

        $counter = 1;

        while ($query->exists()) {
            $slug = $baseSlug . '-' . $counter;

            $query = Category::where('slug', $slug);

            if ($ignoreId !== null) {
                $query->where('id', '!=', $ignoreId);
            }

            $counter++;
        }

        return $slug;
    }
}