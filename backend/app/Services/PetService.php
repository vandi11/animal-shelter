<?php

namespace App\Services;

use App\Models\Pet;

class PetService
{
    public function create(array $data): Pet
    {
        return Pet::create($data);
    }

    public function update(Pet $pet, array $data): Pet
    {
        $pet->update($data);

        return $pet->refresh();
    }
}
