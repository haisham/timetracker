import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ProjectService {

  constructor(private _http: Http) {
    console.log("Service is ready!");

  }
  closeResult: string;

  //retrieve all available events
  getProjects() {
    return this._http
      .get("http://34.211.177.15/api/projects", {})
      .map(res => res.json())
  }

  //save project
  saveProject(projectData) {
    var headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this._http
      .post('hhttp://34.211.177.15/api/register-user', JSON.stringify(projectData), { headers: headers })
      .map(res => res.json())
  }

  closeProject(projectData) {
    var headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this._http
      .post('hhttp://34.211.177.15/api/register-user', JSON.stringify(projectData), { headers: headers })
      .map(res => res.json())
  }

  openProject(projectData) {
    var headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this._http
      .post('hhttp://34.211.177.15/api/register-user', JSON.stringify(projectData), { headers: headers })
      .map(res => res.json())
  }

  updateProject(projectData) {
    var headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this._http
      .post('hhttp://34.211.177.15/api/register-user', JSON.stringify(projectData), { headers: headers })
      .map(res => res.json())
  }

  getMoreProjects(projectData) {
    var headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this._http
      .post('hhttp://34.211.177.15/api/register-user', JSON.stringify(projectData), { headers: headers })
      .map(res => res.json())
  }



}
