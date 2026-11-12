<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        Project::create([
            'title' => 'Nexora',
            'slug' => 'nexora',
            'description' => 'Plateforme digitale dédiée aux services de désinfection, désinsectisation et dératisation.',
            'image' => '/images/projects/nexora.jpg',
            'category' => 'Business',
            'technologies' => [
                'React',
                'Laravel',
                'MySQL',
            ],
            'demo_url' => '#',
            'github_url' => '#',
            'is_featured' => true,
        ]);

        Project::create([
            'title' => 'E-learning',
            'slug' => 'e-learning',
            'description' => 'Plateforme de formation en ligne permettant de consulter des cours et ressources numériques.',
            'image' => '/images/projects/elearning.jpg',
            'category' => 'Web App',
            'technologies' => [
                'React',
                'Laravel',
                'Tailwind CSS',
            ],
            'demo_url' => '#',
            'github_url' => '#',
            'is_featured' => true,
        ]);

        Project::create([
            'title' => 'FrankamDev Shop',
            'slug' => 'frankamdev-shop',
            'description' => 'Expérience e-commerce moderne avec recherche, filtres et commande via WhatsApp.',
            'image' => '/images/projects/shop.jpg',
            'category' => 'E-commerce',
            'technologies' => [
                'React',
                'TypeScript',
                'Tailwind CSS',
            ],
            'demo_url' => '#',
            'github_url' => '#',
            'is_featured' => false,
        ]);
    }
}