<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdminUserUpdateRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'string', 'max:50'],
            'email' => ['sometimes', 'email', 'max:255', 'unique:users,email,' . $this->route('user')?->id],
            'is_admin' => ['sometimes', 'boolean'],
        ];
    }
}
