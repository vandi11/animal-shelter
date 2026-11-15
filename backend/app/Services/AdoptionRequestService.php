<?php

namespace App\Services;

use App\Models\AdoptionRequest;
use App\Models\Pet;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class AdoptionRequestService
{
    public function create(User $user, int $petId): AdoptionRequest
    {
        $pet = Pet::findOrFail($petId);

        if ($pet->adopted) {
            throw ValidationException::withMessages(['pet_id' => 'Ez az állat már örökbefogadott.']);
        }

        if (AdoptionRequest::where('user_id', $user->id)->where('pet_id', $pet->id)->where('status', 'pending')->exists()) {
            throw ValidationException::withMessages(['pet_id' => 'Már van függőben lévő kérelmed ehhez az állathoz.']);
        }

        return AdoptionRequest::create([
            'user_id' => $user->id,
            'pet_id' => $pet->id,
            'status' => 'pending',
        ]);
    }

    public function updateStatus(AdoptionRequest $request, string $status): AdoptionRequest
    {
        return DB::transaction(function () use ($request, $status) {
            $request->load('pet');

            if ($status === 'approved') {
                if ($request->pet->adopted) {
                    throw ValidationException::withMessages(['status' => 'Az állat már örökbefogadott.']);
                }

                $request->pet->update(['adopted' => true, 'adopted_at' => now()]);
                AdoptionRequest::where('pet_id', $request->pet_id)
                    ->where('id', '<>', $request->id)
                    ->where('status', 'pending')
                    ->update(['status' => 'rejected']);
            }

            $request->update(['status' => $status]);

            return $request->refresh();
        });
    }
}
