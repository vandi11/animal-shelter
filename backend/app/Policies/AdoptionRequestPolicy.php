<?php

namespace App\Policies;

use App\Models\AdoptionRequest;
use App\Models\User;

class AdoptionRequestPolicy
{
    public function view(User $user, AdoptionRequest $request): bool
    {
        return $user->isAdmin() || $user->id === $request->user_id;
    }

    public function update(User $user, AdoptionRequest $request): bool { return $user->isAdmin(); }

    public function delete(User $user, AdoptionRequest $request): bool
    {
        return $user->isAdmin() || ($user->id === $request->user_id && $request->status === 'pending');
    }
}
