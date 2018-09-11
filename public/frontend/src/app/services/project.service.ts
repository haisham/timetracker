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
      .get("http://http://34.211.177.15/api/projects", {})
      .map(res => res.json())
  }

  //save user and eventually add user as participant for particular event
  saveUser(userData) {
    var headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this._http
      .post('http://35.162.97.188/api/register-user', JSON.stringify(userData), { headers: headers })
      .map(res => res.json())
  }

  //retrieve all the users registered for the focused event 
  getRegistrationsOverview(Event) {
    return this._http
      .get("http://35.162.97.188/api/registrations-overview/" + Event.id, {})
      .map(res => res.json())
  }

  //optional in case of many events we may need to introduce pagination, in backend context laravel as a nice built in way to introduce pagination. 
  getMoreEvents(id) {
    return this._http
      .get('/api/events?page=' + id)
      .map(res => res.json())
  }



}
