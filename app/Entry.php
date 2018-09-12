<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Entry extends Model
{
    protected $table = "Entries";

    protected $fillable = ['id', 'project_id', 'start_time', 'end_time'];
}
