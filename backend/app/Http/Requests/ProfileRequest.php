<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProfileRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        $required = $this->isMethod('post') || $this->isMethod('put') ? 'required' : 'sometimes';

        return [
            'full_name' => [$required, 'string', 'max:255'],
            'phone' => [$required, 'string', 'max:20'],
            'address' => [$required, 'string', 'max:255'],
        ];
    }
}
