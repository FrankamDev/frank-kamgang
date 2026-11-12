<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        Category::insert([
            [
                'name' => 'Laravel',
                'slug' => 'laravel',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'React',
                'slug' => 'react',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'TypeScript',
                'slug' => 'typescript',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Business',
                'slug' => 'business',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Design',
                'slug' => 'design',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}