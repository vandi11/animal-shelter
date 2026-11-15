<?php

namespace Database\Factories;

use App\Models\Pet;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Pet>
 */
class PetFactory extends Factory
{
    protected $model = Pet::class;

    public function definition(): array
    {
        return [
            'species' => fake()->randomElement(['dog', 'cat', 'rabbit']),
            'name' => fake()->firstName(),
            'photo_path' => null,
            'gender' => fake()->randomElement(['male', 'female', 'unknown']),
            'birth_date' => fake()->dateTimeBetween('-10 years', '-6 months')->format('Y-m-d'),
            'weight' => fake()->randomFloat(2, 1, 35),
            'color' => fake()->safeColorName(),
            'adopted' => false,
            'health_status' => fake()->randomElement(['healthy', 'under observation', 'needs treatment']),
            'sterilized' => fake()->boolean(70),
            'arrival_date' => fake()->dateTimeBetween('-2 years', '-1 month')->format('Y-m-d'),
            'adopted_at' => null,
            'description' => fake()->paragraph(),
        ];
    }

    public function adopted(): static
    {
        return $this->state(fn (array $attributes) => [
            'adopted' => true,
            'adopted_at' => now()->toDateString(),
        ]);
    }
}
