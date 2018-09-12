<?php
namespace App;
use Illuminate\Database\Eloquent\Collection;
class EntryCollection extends Collection
{
    public function threaded()
    {
        $entries = parent::groupBy('project_id')->sortBy('start_time');
        return $entries;
    }
}