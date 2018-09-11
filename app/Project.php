<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $table = "Projects";

    protected $fillable = ['id', 'title', 'status'];

}
