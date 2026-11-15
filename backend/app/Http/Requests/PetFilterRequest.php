<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PetFilterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'species' => ['sometimes', 'string', 'max:50', Rule::exists('pets', 'species')],
            'gender' => ['sometimes', Rule::in(['male', 'female', 'unknown'])],
            'adopted' => ['sometimes', Rule::in(['true', 'false', '1', '0'])],
        ];
    }
}
