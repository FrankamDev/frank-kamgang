<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(
            Project::latest()->get()
        );
    }

    public function store(Request $request): JsonResponse
{
    $data = $request->validate([
        'title' => ['required', 'string', 'max:255'],
        'description' => ['required', 'string'],
        'image' => ['nullable', 'string'],
        'category' => ['required', 'string', 'max:100'],
        'technologies' => ['nullable', 'array'],
        'technologies.*' => ['string'],
        'demo_url' => ['nullable', 'url'],
        'github_url' => ['nullable', 'url'],
        'is_featured' => ['boolean'],
    ]);

    $data['slug'] = $this->generateUniqueSlug($data['title']);

    $project = Project::create($data);

    return response()->json([
        'message' => 'Projet créé avec succès.',
        'project' => $project,
    ], 201);
}

    public function show(Project $project): JsonResponse
    {
        return response()->json($project);
    }

    public function update(
        Request $request,
        Project $project
    ): JsonResponse {
        $data = $request->validate([
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['sometimes', 'required', 'string'],
            'image' => ['nullable', 'string'],
            'category' => ['sometimes', 'required', 'string', 'max:100'],
            'technologies' => ['nullable', 'array'],
            'technologies.*' => ['string'],
            'demo_url' => ['nullable', 'url'],
            'github_url' => ['nullable', 'url'],
            'is_featured' => ['boolean'],
        ]);

        if (isset($data['title'])) {
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

    public function destroy(Project $project): JsonResponse
    {
        $project->delete();

        return response()->json([
            'message' => 'Projet supprimé avec succès.',
        ]);
    }

    private function generateUniqueSlug(
        string $title,
        ?int $ignoreId = null
    ): string {
        $baseSlug = Str::slug($title);
        $slug = $baseSlug;
        $counter = 1;

        while (
            Project::where('slug', $slug)
                ->when(
                    $ignoreId,
                    fn ($query) =>
                        $query->where('id', '!=', $ignoreId)
                )
                ->exists()
        ) {
            $slug = "{$baseSlug}-{$counter}";
            $counter++;
        }

        return $slug;
    }
}