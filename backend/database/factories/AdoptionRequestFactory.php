<?php

namespace Database\Factories;

use App\Models\AdoptionRequest;
use App\Models\Pet;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<AdoptionRequest>
 */
class AdoptionRequestFactory extends Factory
{
    protected $model = AdoptionRequest::class;

    public function definition(): array
    {
        return [
            'pet_id' => Pet::factory(),
            'user_id' => User::factory(),
            'status' => 'pending',
        ];
    }

    public function approved(): static
    {
        return $this->state(fn (array $attributes) => ['status' => 'approved']);
    }

    public function rejected(): static
    {
        return $this->state(fn (array $attributes) => ['status' => 'rejected']);
    }
}
