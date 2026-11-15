<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Pet;
use App\Models\Profile;
use App\Models\AdoptionRequest;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $admin = User::updateOrCreate(['email' => 'admin@example.com'], [
            'name' => 'Shelter Admin',
            'password' => 'Password!123',
            'is_admin' => true,
            'email_verified_at' => now(),
        ]);

        $testUser = User::updateOrCreate(['email' => 'test@example.com'], [
            'name' => 'Test User',
            'password' => 'Password!123',
            'is_admin' => false,
            'email_verified_at' => now(),
        ]);

        $users = User::factory(4)->create();
        $allUsers = collect([$testUser])->merge($users);

        foreach ($allUsers as $user) {
            Profile::updateOrCreate(
                ['user_id' => $user->id],
                Profile::factory()->make()->toArray(),
            );
        }

        $pets = Pet::factory(12)->create();
        $pets[1]->update(['adopted' => true, 'adopted_at' => now()->toDateString()]);

        AdoptionRequest::create([
            'pet_id' => $pets[0]->id,
            'user_id' => $testUser->id,
            'status' => 'pending',
        ]);

        AdoptionRequest::create([
            'pet_id' => $pets[1]->id,
            'user_id' => $users[0]->id,
            'status' => 'approved',
        ]);

        AdoptionRequest::create([
            'pet_id' => $pets[2]->id,
            'user_id' => $users[1]->id,
            'status' => 'rejected',
        ]);
    }
}
