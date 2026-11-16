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
        $data = $request->validate([
            'title' => [
                'required',
                'string',
                'max:255',
            ],

            'description' => [
                'required',
                'string',
            ],

            'image' => [
                'nullable',
                'string',
            ],

            'category' => [
                'required',
                'string',
                'max:100',
            ],

            'technologies' => [
                'nullable',
                'array',
            ],

            'technologies.*' => [
                'string',
            ],

            'demo_url' => [
                'nullable',
                'url',
            ],

            'github_url' => [
                'nullable',
                'url',
            ],

            'is_featured' => [
                'sometimes',
                'boolean',
            ],
        ]);

        $data['slug'] = $this->generateUniqueSlug(
            $data['title']
        );

        $project = Project::create($data);

        return response()->json([
            'message' => 'Projet créé avec succès.',
            'project' => $project,
        ], 201);
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
        $data = $request->validate([
            'title' => [
                'sometimes',
                'required',
                'string',
                'max:255',
            ],

            'description' => [
                'sometimes',
                'required',
                'string',
            ],

            'image' => [
                'nullable',
                'string',
            ],

            'category' => [
                'sometimes',
                'required',
                'string',
                'max:100',
            ],

            'technologies' => [
                'nullable',
                'array',
            ],

            'technologies.*' => [
                'string',
            ],

            'demo_url' => [
                'nullable',
                'url',
            ],

            'github_url' => [
                'nullable',
                'url',
            ],

            'is_featured' => [
                'sometimes',
                'boolean',
            ],
        ]);

        // Régénération du slug uniquement si le titre change
        if (
            isset($data['title']) &&
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
            $slug = "{$baseSlug}-{$counter}";
            $counter++;
        }

        return $slug;
    }
}