<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Post;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        $laravel = Category::where('slug', 'laravel')->first();
        $react = Category::where('slug', 'react')->first();
        $typescript = Category::where('slug', 'typescript')->first();
        $business = Category::where('slug', 'business')->first();
        $design = Category::where('slug', 'design')->first();

        Post::create([
            'category_id' => $laravel->id,
            'title' => 'Construire une API Laravel propre et évolutive',
            'slug' => 'construire-api-laravel-propre-evolutive',
            'excerpt' => 'Les bonnes pratiques que j’utilise pour structurer une API Laravel moderne.',
            'content' => 'Dans cet article, nous allons voir comment organiser une API Laravel moderne, ses contrôleurs, ses modèles et ses routes.',
            'image' => '/images/blog/laravel-api.jpg',
            'published_at' => now(),
        ]);

        Post::create([
            'category_id' => $react->id,
            'title' => 'Créer une interface React moderne',
            'slug' => 'creer-interface-react-moderne',
            'excerpt' => 'Comment construire une interface React moderne, responsive et agréable à utiliser.',
            'content' => 'React permet de construire des interfaces dynamiques et réutilisables grâce aux composants.',
            'image' => '/images/blog/react-interface.jpg',
            'published_at' => now()->subDay(),
        ]);

        Post::create([
            'category_id' => $typescript->id,
            'title' => 'Pourquoi utiliser TypeScript avec React ?',
            'slug' => 'pourquoi-typescript-react',
            'excerpt' => 'Les avantages de TypeScript pour rendre les projets React plus fiables.',
            'content' => 'TypeScript permet de détecter de nombreuses erreurs avant même l’exécution du programme.',
            'image' => '/images/blog/typescript-react.jpg',
            'published_at' => now()->subDays(2),
        ]);

        Post::create([
            'category_id' => $business->id,
            'title' => 'Trouver ses premiers clients en freelance',
            'slug' => 'trouver-premiers-clients-freelance',
            'excerpt' => 'Une approche concrète pour commencer à vendre ses compétences sur internet.',
            'content' => 'Le freelancing nécessite une bonne offre, une présence professionnelle et une stratégie d’acquisition.',
            'image' => '/images/blog/freelance.jpg',
            'published_at' => now()->subDays(3),
        ]);

        Post::create([
            'category_id' => $design->id,
            'title' => 'Les principes d’un bon design web',
            'slug' => 'principes-bon-design-web',
            'excerpt' => 'Quelques principes essentiels pour créer des interfaces professionnelles.',
            'content' => 'Un bon design repose notamment sur la hiérarchie visuelle, la lisibilité, les espaces et la cohérence.',
            'image' => '/images/blog/web-design.jpg',
            'published_at' => now()->subDays(4),
        ]);
    }
}