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
      .get("http://54.184.124.76/api/projects", {})
      .map(res => res.json())
  }

  //add new project
  addProject(projectData) {
    var headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this._http
      .post('http://54.184.124.76/api/add-project', JSON.stringify(projectData), { headers: headers })
      .map(res => res.json())
  }

  closeProject(projectData) {
    var headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this._http
      .put('http://54.184.124.76/api/close-project/'+projectData.id, {}, { headers: headers })
      .map(res => res.json())
  }

  openProject(projectData) {
    var headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this._http
      .put('http://54.184.124.76/api/open-project/'+projectData.id, {}, { headers: headers })
      .map(res => res.json())
  }

  addEntry(entryData) {
    var headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this._http
      .post('http://54.184.124.76/api/add-entry', JSON.stringify(entryData), { headers: headers })
      .map(res => res.json())
  }

  //retrieve all entries
  getEntries(projectId) {
    return this._http
      .get('http://54.184.124.76/api/entries/'+projectId, {})
      .map(res => res.json())
  }

  //retrieve all entries
  removeEntry(id) {
    return this._http
      .delete('http://54.184.124.76/api/entry/'+id, {})
      .map(res => res.json())
  }

  getMoreProjects(projectData) {
    var headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this._http
      .post('http://54.184.124.76/api/register-user', JSON.stringify(projectData), { headers: headers })
      .map(res => res.json())
  }



}
