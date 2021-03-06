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
	 * Display a listing of the projects.
	 *
	 * @return Response
	 */
    public function getAllProjects(){
        $projects = Project::paginate($this->page_length);
        $response = ['success' => 'true', 'projects' => $projects];
        return response()->json($response);
    }
    
    /**
	 * Store a newly created resource in storage.
	 * @param  sting  title
	 * @return Response
	 */
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

    /**
	 * Sets the status of project as closed
	 * @param  int  $id
	 * @return Response
	 */
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

    /**
	 * Sets the status of project as open
	 * @param  int  $id
	 * @return Response
	 */
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
    
    /**
	 * Store a newly created resource in storage.
	 * @param  int  $id
     * @param  datetime start_time
     * @param  datetime stop_time
	 * @return Response
	 */
    public function addEntry(Request $request){
        $projectId = $request->get('projectId');
        $startTime = $request->get('startTime');
        $stopTime = $request->get('stopTime');

        $Entry = new Entry();
        $Entry->project_id = $projectId;
        $Entry->start_time = $startTime;
        $Entry->stop_time = $stopTime;
        $difference = date_diff( date_create($startTime), date_create($stopTime));
        $formattedDifference = $difference->format('%h:%i');
        $Entry->time_spent = $formattedDifference;
        if($Entry->save()){
            $success = ['success'=>'true'];
            return response()->json($success);
        }else{
            $success = ['success'=>'false'];
            return response()->json($success);
        }
    }

    /**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
    public function getEntries($projectId) {

        $entries = Project::with('entries')
                    ->where('id', $projectId)->get();
        return response()->json($entries);
    }

    /**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
    public function deleteEntry($entryId) {
        $Entry = Entry::destroy($entryId);
        $success = ['success'=>'true'];
        return response()->json($success);
       
    }
}

