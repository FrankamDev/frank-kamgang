<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class CreateAdminUser extends Command
{
    protected $signature = 'admin:create {name} {email}';

    protected $description = 'Créer un utilisateur administrateur';

    public function handle(): int
    {
        $name = $this->argument('name');
        $email = $this->argument('email');

        if (User::where('email', $email)->exists()) {
            $this->error('Cet email existe déjà.');
            return self::FAILURE;
        }

        $password = $this->secret('Mot de passe');

        if (!$password) {
            $this->error('Le mot de passe est obligatoire.');
            return self::FAILURE;
        }

        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password),
            'is_admin' => true,
        ]);

        $this->info("Admin créé : {$user->email}");

        return self::SUCCESS;
    }
}