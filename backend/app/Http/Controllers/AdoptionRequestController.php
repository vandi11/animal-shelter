<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdoptionRequestStatusRequest;
use App\Http\Resources\AdoptionRequestResource;
use App\Models\AdoptionRequest;
use App\Services\AdoptionRequestService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdoptionRequestController extends Controller
{
    public function __construct(private readonly AdoptionRequestService $service) {}

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate(['pet_id' => ['required', 'integer', 'exists:pets,id']]);
        $model = $this->service->create($request->user(), $data['pet_id'])->load(['pet', 'user']);

        return response()->json(['data' => new AdoptionRequestResource($model)], 201);
    }

    public function index()
    {
        return AdoptionRequestResource::collection(
            AdoptionRequest::with(['pet', 'user'])->orderBy('id', 'asc')->get()
        );
    }

    public function myRequests(Request $request)
    {
        return AdoptionRequestResource::collection(
            AdoptionRequest::with('pet')
                ->where('user_id', $request->user()->id)
                ->orderBy('id', 'asc')
                ->get()
        );
    }

    public function show(Request $request, AdoptionRequest $adoptionRequest): AdoptionRequestResource
    {
        $this->authorize('view', $adoptionRequest);

        return new AdoptionRequestResource($adoptionRequest->load(['pet', 'user']));
    }

    public function update(AdoptionRequestStatusRequest $request, AdoptionRequest $adoptionRequest): AdoptionRequestResource
    {
        $this->authorize('update', $adoptionRequest);

        return new AdoptionRequestResource(
            $this->service->updateStatus($adoptionRequest, $request->string('status')->toString())->load(['pet', 'user'])
        );
    }

    public function destroy(Request $request, AdoptionRequest $adoptionRequest): JsonResponse
    {
        $this->authorize('delete', $adoptionRequest);
        $adoptionRequest->delete();

        return response()->json(['message' => 'Az örökbefogadási kérelem törölve.']);
    }
}
