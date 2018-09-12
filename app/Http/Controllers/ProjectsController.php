<?php
namespace App\Http\Controllers;
use App\Project;
use App\Entry;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
class ProjectsController extends Controller
{
    private $page_length = 5;
    /**
     * getAllProjects
     * A function to return all projects
     * @return json_encode
     */
    public function getAllProjects(){
        $projects = Project::paginate($this->page_length);
        $response = ['success' => 'true', 'projects' => $projects];
        return response()->json($response);
    }

    public function addProject(Request $request){
        $this->validate($request, [
            'title' => 'required|unique:Projects|max:255',
        ]);
        $project = new Project();
        $project->title = $request->get('title');
        $project->status = 0;
        if($project->save()){
            $projects = Project::paginate($this->page_length);
            $response = ['success' => 'true', 'projects' => $projects];
            return response()->json($response);
        }else{
            $error = ['success'=>'false'];
            return response()->json($error);
        }
    }

    public function closeProject($projectId){
        $Project = Project::find($projectId);
        $Project->status = 1;
        if($Project->save()){
            $success = ['success'=>'true'];
            return response()->json($success);
        }else{
            $success = ['success'=>'false'];
            return response()->json($success);
        }
    }

    public function openProject($projectId){
        $Project = Project::find($projectId);
        $Project->status = 0;
        if($Project->save()){
            $success = ['success'=>'true'];
            return response()->json($success);
        }else{
            $success = ['success'=>'false'];
            return response()->json($success);
        }
    }
  
    public function addEntry(Request $request){
        $projectId = $request->get('projectId');
        $startTime = $request->get('startTime');
        $stopTime = $request->get('stopTime');

        $Entry = new Entry();
        $Entry->project_id = $projectId;
        $Entry->start_time = $startTime;
        $Entry->stop_time = $stopTime;
        if($Entry->save()){
            $success = ['success'=>'true'];
            return response()->json($success);
        }else{
            $success = ['success'=>'false'];
            return response()->json($success);
        }
    }

    public function getEntries($projectId, $date) {

        $entries = Project::with('entries')
                    ->where('id', $projectId)->get();
        return response()->json($entries);
    }
}

