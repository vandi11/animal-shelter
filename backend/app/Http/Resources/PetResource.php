<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PetResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'species' => $this->species,
            'name' => $this->name,
            'photo_path' => $this->photo_path,
            'gender' => $this->gender,
            'birth_date' => $this->birth_date?->toDateString(),
            'weight' => $this->weight,
            'color' => $this->color,
            'adopted' => (bool) $this->adopted,
            'health_status' => $this->health_status,
            'sterilized' => (bool) $this->sterilized,
            'arrival_date' => $this->arrival_date?->toDateString(),
            'adopted_at' => $this->adopted_at?->toDateString(),
            'description' => $this->description,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
