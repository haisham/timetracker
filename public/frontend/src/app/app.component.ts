import { Component } from '@angular/core';
import { ProjectService } from './services/project.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProjectService],
})

export class AppComponent {

  mainTitle = 'All Projects';
  title: string;
  id: number;
  Projects: any;
  validTitle = true;
  last_page: any;
  _last_page: number;
  current_page: number;
  total_Project: number;
  per_page: number;
  selectedProject: string;


  disablePrev: boolean;
  disableNext: boolean;
  inputFocused: boolean;
  isInEdit: boolean;
  index: number;


  constructor(private _ProjectService: ProjectService, private _modalService: NgbModal) {
    this.onLoad();
    this.inputFocused = false;
    this.index = 0;
  }



  onLoad() {
    var result = this._ProjectService.getProjects();
    result.subscribe((data) => {
      this.last_page = Array(data.last_page);
      this._last_page = data.last_page;
      this.current_page = data.current_page;
      this.per_page = data.per_page;
      this.Projects = data.data;
      this.disableNext = true;
      this.disablePrev = false;
      this.total_Project = data.total;

    });

  }

  newProject() {
    var result;
    var newProject = {
      id: this.id,
      title: this.title,
      status: 0
    };
    result = this._ProjectService.saveProject(newProject);
    result.subscribe((data) => {
      this.current_page = data.current_page;
      this.Projects = data.data;
      this.total_Project = this.total_Project + 1;
      this.title = '';
      this.validTitle = true;
      this.last_page = Array(data.last_page);
      this._last_page = data.last_page;
    },
      (errorData) => {
        this.validTitle = false;
      });

  }

  closeProject(Project) {
    var result;
    result = this._ProjectService.closeProject(Project);
    result.subscribe((data) => {
      Project.status = 1;
    });

  }

  openProject(Project) {
    var result;
    result = this._ProjectService.openProject(Project);
    result.subscribe((data) => {
      Project.status = 0;
    });
  }

  updateProject(id) {
    var Project = {
      id: this.id,
      title: this.selectedProject
    };
    var result = this._ProjectService.updateProject(Project);
    result.subscribe((data) => {
      this.Projects.forEach(element => {
        if (element.id == id) {
          element.title = Project.title;
          this.index = 0;
        }
      });
    },
      (errorData) => {
        this.index = id;
        this.isInEdit = true;
      });

    this.index = 0;

  }


  pageNumber(_number) {
    this.current_page = _number;
    if (this.current_page == 1) {
      this.disablePrev = false;
      this.disableNext = true;
    } else if (this.current_page == this._last_page) {
      this.disableNext = false;
      this.disablePrev = true;
    } else {
      this.disablePrev = true;
      this.disableNext = true;
    }
    var result = this._ProjectService.getMoreProjects(this.current_page);
    result.subscribe((data) => {
      this.Projects = data.data;
    });

  }









}