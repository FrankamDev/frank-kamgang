<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    /**
     * Liste tous les projets.
     */
    public function index(): JsonResponse
    {
        $projects = Project::latest()->get();

        return response()->json($projects);
    }

    /**
     * Créer un projet.
     */
    public function store(Request $request): JsonResponse
{
    try {
        $project = Project::create([
            'title' => $request->input('title'),
            'slug' => $this->generateUniqueSlug(
                $request->input('title')
            ),
            'description' => $request->input('description'),
            'image' => $request->input('image'),
            'category' => $request->input('category'),
            'technologies' => $request->input('technologies', []),
            'demo_url' => $request->input('demo_url'),
            'github_url' => $request->input('github_url'),
            'is_featured' => $request->boolean('is_featured'),
        ]);

        return response()->json([
            'message' => 'Projet créé avec succès.',
            'project' => $project,
        ], 201);

    } catch (\Throwable $e) {

        \Log::error('PROJECT CREATE ERROR', [
            'message' => $e->getMessage(),
            'data' => $request->all(),
        ]);

        return response()->json([
            'message' => 'Erreur lors de la création du projet.',
            'error' => $e->getMessage(),
        ], 500);
    }
}

    /**
     * Afficher un projet par son slug.
     */
    public function show(string $slug): JsonResponse
    {
        $project = Project::where('slug', $slug)->firstOrFail();

        return response()->json($project);
    }

    /**
     * Modifier un projet.
     */
    public function update(
    Request $request,
    Project $project
): JsonResponse {
    try {
        $data = [
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'image' => $request->input('image'),
            'category' => $request->input('category'),
            'technologies' => $request->input('technologies', []),
            'demo_url' => $request->input('demo_url'),
            'github_url' => $request->input('github_url'),
            'is_featured' => $request->boolean('is_featured'),
        ];

        // Régénérer le slug uniquement si le titre change
        if (
            $data['title'] !== $project->title
        ) {
            $data['slug'] = $this->generateUniqueSlug(
                $data['title'],
                $project->id
            );
        }

        $project->update($data);

        return response()->json([
            'message' => 'Projet modifié avec succès.',
            'project' => $project->fresh(),
        ]);

    } catch (\Throwable $e) {

        \Log::error('PROJECT UPDATE ERROR', [
            'project_id' => $project->id,
            'message' => $e->getMessage(),
            'data' => $request->all(),
        ]);

        return response()->json([
            'message' => 'Erreur lors de la modification du projet.',
            'error' => $e->getMessage(),
        ], 500);
    }
}

    /**
     * Supprimer un projet.
     */
    public function destroy(Project $project): JsonResponse
    {
        $project->delete();

        return response()->json([
            'message' => 'Projet supprimé avec succès.',
        ]);
    }

    /**
     * Générer un slug unique.
     */
    private function generateUniqueSlug(
        string $title,
        ?int $ignoreId = null
    ): string {
        $baseSlug = Str::slug($title);

        if ($baseSlug === '') {
            $baseSlug = 'projet';
        }

        $slug = $baseSlug;
        $counter = 1;

        while (
            Project::where('slug', $slug)
                ->when(
                    $ignoreId !== null,
                    function ($query) use ($ignoreId) {
                        $query->where('id', '!=', $ignoreId);
                    }
                )
                ->exists()
        ) {
            $slug = $baseSlug . '-' . $counter;
            $counter++;
        }

        return $slug;
    }
}