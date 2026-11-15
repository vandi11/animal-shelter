<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PetRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        $required = $this->isMethod('post') ? 'required' : 'sometimes';

        return [
            'species' => [$required, 'string', 'max:50'],
            'name' => [$required, 'string', 'max:100'],
            'photo_path' => ['sometimes', 'nullable', 'string', 'max:255'],
            'gender' => [$required, Rule::in(['male', 'female', 'unknown'])],
            'birth_date' => ['sometimes', 'nullable', 'date'],
            'weight' => ['sometimes', 'nullable', 'numeric', 'min:0', 'max:999.99'],
            'color' => ['sometimes', 'nullable', 'string', 'max:255'],
            'adopted' => ['sometimes', 'boolean'],
            'health_status' => ['sometimes', 'nullable', 'string', 'max:100'],
            'sterilized' => ['sometimes', 'boolean'],
            'arrival_date' => ['sometimes', 'nullable', 'date'],
            'adopted_at' => ['sometimes', 'nullable', 'date'],
            'description' => ['sometimes', 'nullable', 'string'],
        ];
    }
}
