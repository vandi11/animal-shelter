<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('pets', function (Blueprint $table) {
            $table->id();
            $table->string('species', 50);
            $table->string('name', 100);
            $table->string('photo_path', 255)->nullable();
            $table->enum('gender', ['male', 'female', 'unknown'])->default('unknown');
            $table->date('birth_date')->nullable();
            $table->decimal('weight', 5, 2)->nullable();
            $table->string('color')->nullable();
            $table->boolean('adopted')->default(false);
            $table->string('health_status', 100)->nullable();
            $table->boolean('sterilized')->default(false);
            $table->date('arrival_date')->nullable();
            $table->date('adopted_at')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
            $table->index(['species', 'gender', 'adopted']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pets');
    }
};
