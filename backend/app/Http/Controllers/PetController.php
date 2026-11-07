<?php

namespace App\Http\Controllers;

use App\Http\Requests\PetRequest;
use App\Http\Requests\PetFilterRequest;
use App\Http\Resources\PetResource;
use App\Models\Pet;
use App\Services\PetService;
use Illuminate\Http\JsonResponse;

class PetController extends Controller
{
    public function __construct(private readonly PetService $service) {}

    public function index(PetFilterRequest $request)
    {
        $query = Pet::query();
        $filters = $request->validated();

        foreach (['species', 'gender'] as $filter) {
            if (array_key_exists($filter, $filters)) {
                $query->where($filter, $filters[$filter]);
            }
        }

        if (array_key_exists('adopted', $filters)) {
            $query->where('adopted', in_array($filters['adopted'], ['true', '1'], true));
        }

        return PetResource::collection(
            $query->orderBy('id', 'asc')->get()
        );
    }

    public function show(Pet $pet): PetResource
    {
        return new PetResource($pet);
    }

    public function store(PetRequest $request): JsonResponse
    {
        $this->authorize('create', Pet::class);

        return response()->json(['data' => new PetResource($this->service->create($request->validated()))], 201);
    }

    public function update(PetRequest $request, Pet $pet): PetResource
    {
        $this->authorize('update', $pet);

        return new PetResource($this->service->update($pet, $request->validated()));
    }

    public function destroy(Pet $pet): JsonResponse
    {
        $this->authorize('delete', $pet);
        $pet->delete();

        return response()->json(['message' => 'Az állat törölve.']);
    }
}
