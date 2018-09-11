<?php
namespace App\Http\Controllers;
use App\Project;
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
            $error = ['error'=>'true'];
            return response()->json($error);
        }
    }
    public function completeProject($Projectid){
        $Project = Project::find($Projectid);
        $Project->status = 1;
        if($Project->save()){
            $success = ['success'=>'true'];
            return response()->json($success);
        }else{
            $success = ['success'=>'false'];
            return response()->json($success);
        }
    }
    public function incompleteProject($id){
        $Project = Project::find($id);
        $Project->status = 0;
        if($Project->save()){
            $success = ['success'=>'true'];
            return response()->json($success);
        }else{
            $success = ['success'=>'false'];
            return response()->json($success);
        }
    }
    public function deleteProject($Projectid){
        $Project = Project::destroy($Projectid);
        $Projects = Project::paginate($this->page_length);
        if($Project){
            return response()->json($Projects);
        }else{
            $success = ['success'=>'false'];
            return response()->json($success);
        }
    }
    public function updateProject($Projectid,Request $request){
        $this->validate($request,[
            'title' => 'required|unique:Projects,id|max:40'.$Projectid,
        ]);
        $Project = Project::find($Projectid);
        $Project->title = $request->get('title');
        $Project->status = 0;
        if($Project->save()){
            return response()->json($Project);
        }else{
            $success = ['success'=>'false'];
            return response()->json($success);
        }
    }
    
    
      public function saveNote($Projectid,Request $request){
        $Project = Project::find($Projectid);
        $Project->notes = $request->get('notes');
        $Project->status = 0;
        if($Project->save()){
            return response()->json($Project);
        }else{
            $success = ['success'=>'false'];
            return response()->json($success);
        }
    }
}

