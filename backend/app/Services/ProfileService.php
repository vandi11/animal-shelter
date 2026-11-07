<?php

namespace App\Services;

use App\Models\Profile;
use App\Models\User;

class ProfileService
{
    public function save(User $user, array $data): Profile
    {
        return $user->profile()->updateOrCreate([], $data);
    }
}
