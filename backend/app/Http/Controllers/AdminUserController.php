<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminUserUpdateRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class AdminUserController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', User::class);

        return UserResource::collection(
            User::with('profile')->orderBy('id', 'asc')->get()
        );
    }

    public function show(User $user): UserResource
    {
        $this->authorize('view', $user);

        return new UserResource($user->load('profile'));
    }

    public function update(AdminUserUpdateRequest $request, User $user): UserResource
    {
        $this->authorize('update', $user);
        $user->update($request->validated());

        return new UserResource($user->refresh());
    }

    public function destroy(User $user): JsonResponse
    {
        $this->authorize('delete', $user);
        abort_if(auth()->id() === $user->id, 422, 'A saját admin fiókod nem törölheted.');
        $user->delete();

        return response()->json(['message' => 'A felhasználó törölve.']);
    }
}
