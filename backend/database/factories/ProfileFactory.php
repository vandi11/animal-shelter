<?php

namespace Database\Factories;

use App\Models\Profile;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Profile>
 */
class ProfileFactory extends Factory
{
    protected $model = Profile::class;

    public function definition(): array
    {
        return [
            'full_name' => fake()->name(),
            'phone' => '+36' . fake()->numerify('#########'),
            'address' => fake()->address(),
        ];
    }
}
