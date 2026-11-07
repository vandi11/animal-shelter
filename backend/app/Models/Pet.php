<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Pet extends Model
{
    use HasFactory;

    protected $fillable = [
        'species', 'name', 'photo_path', 'gender', 'birth_date', 'weight',
        'color', 'adopted', 'health_status', 'sterilized', 'arrival_date',
        'adopted_at', 'description',
    ];

    protected function casts(): array
    {
        return [
            'birth_date' => 'date',
            'arrival_date' => 'date',
            'adopted_at' => 'date',
            'weight' => 'decimal:2',
            'adopted' => 'boolean',
            'sterilized' => 'boolean',
        ];
    }

    public function adoptionRequests(): HasMany
    {
        return $this->hasMany(AdoptionRequest::class);
    }
}
