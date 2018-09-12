import { Component } from '@angular/core';
import { ProjectService } from './services/project.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { TimeRegistrationsComponent } from './time-registrations/time-registrations.component';
import { RegistrationsOverviewComponent } from './registrations-overview/registrations-overview.component';



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
  successMessage: boolean;
  errorMessage: boolean;
  successMessageText: string;
  errorMessageText: string;
  disablePrev: boolean;
  disableNext: boolean;
  inputFocused: boolean;
  isInEdit: boolean;
  index: number;
  formdata;


  constructor(private _ProjectService: ProjectService, private _modalService: NgbModal) {
    this.inputFocused = false;
    this.index = 0;
  }


  ngOnInit() {
    this.formdata = new FormGroup({
      title: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ]))
    });
    this.successMessage = false;
    this.errorMessage = false;
    this.getProjects();
  }

  getProjects() {
    var result = this._ProjectService.getProjects();
    result.subscribe((response) => {
      if (response.success === "true") {
        this.last_page = Array(response.projects.last_page);
        this._last_page = response.projects.last_page;
        this.current_page = response.projects.current_page;
        this.per_page = response.projects.per_page;
        this.Projects = response.projects.data;
        this.disableNext = true;
        this.disablePrev = false;
        this.total_Project = response.projects.total;
      }

    });

  }

  newProject(projectData) {
    this.successMessage = false;
    this.errorMessage = false;

    let result = this._ProjectService.addProject(projectData);
    result.subscribe((response) => {
      if (response.success === "true") {
        this.successMessage = true;
        this.successMessageText = "Project added!";
        this.current_page = response.projects.current_page;
        this.Projects = response.projects.data;
        this.total_Project = this.total_Project + 1;
        this.title = '';
        this.validTitle = true;
        this.last_page = Array(response.projects.last_page);
        this._last_page = response.projects.last_page;
        setTimeout(() => {
          this.successMessageText = "";
          this.successMessage = false;
        }, 3000);
      } else {
        this.errorMessage = true;
        this.errorMessageText = "Hov. der sket en fejl :(";
      }


    },
      (errorData) => {
        this.errorMessage = true;
        this.errorMessageText = "Hov. der sket en fejl :(";
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

  openTimeRegistrations(Project) {
    const modal =  this._modalService.open(TimeRegistrationsComponent);
    modal.componentInstance.Project = Project;
  }

  openRegistrationsOverview(Project) {
    const modal =  this._modalService.open(TimeRegistrationsComponent);
    modal.componentInstance.Project = Project;
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