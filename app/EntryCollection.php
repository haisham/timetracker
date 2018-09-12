<?php
namespace App;
use Illuminate\Database\Eloquent\Collection;
class EntryCollection extends Collection
{
    public function threaded()
    {
        $entries = parent::groupBy('post_id');
        return $entries;
    }
}