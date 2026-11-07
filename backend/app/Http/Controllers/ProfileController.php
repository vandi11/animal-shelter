<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileRequest;
use App\Http\Resources\ProfileResource;
use App\Models\Profile;
use App\Services\ProfileService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function __construct(private readonly ProfileService $service) {}

    public function show(Request $request)
    {
        $profile = $request->user()->profile;

        abort_unless($profile, 404, 'A profil nem található.');

        return new ProfileResource($profile);
    }

    public function store(ProfileRequest $request): JsonResponse
    {
        $this->authorize('create', Profile::class);

        return response()->json(['data' => new ProfileResource($this->service->save($request->user(), $request->validated()))], 201);
    }

    public function update(ProfileRequest $request): ProfileResource
    {
        $profile = $request->user()->profile;
        abort_unless($profile, 404, 'A profil nem található.');
        $this->authorize('update', $profile);

        return new ProfileResource($this->service->save($request->user(), $request->validated()));
    }
}
