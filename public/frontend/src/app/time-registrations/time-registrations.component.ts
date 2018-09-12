import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbDateStruct, NgbTimeStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from '../services/project.service';


@Component({
  selector: 'app-time-registrations',
  templateUrl: './time-registrations.component.html',
  styleUrls: ['./time-registrations.component.css'],
  providers: [ProjectService]
})
export class TimeRegistrationsComponent implements OnInit {
  dateModel;
  startTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  stopTime: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  TimeRegistrations: any;
  @Input() Project;
  constructor(private _ProjectService: ProjectService, private activeModal: NgbActiveModal, private calendar: NgbCalendar) {
  }

  ngOnInit() {
    this.dateModel = this.calendar.getToday();
    this.getEntries();
  }

  addTime(Project) {

    let startTime = `${this.pad(this.startTime.hour)}:${this.pad(this.startTime.minute)}:${this.pad(this.startTime.second)}`;
    let formattedStartTime = this.dateModel.year + '-' + this.dateModel.month + '-' + this.dateModel.day + ' ' + startTime;

    let stopTime = `${this.pad(this.stopTime.hour)}:${this.pad(this.stopTime.minute)}:${this.pad(this.stopTime.second)}`;
    let formattedStopTime = this.dateModel.year + '-' + this.dateModel.month + '-' + this.dateModel.day + ' ' + stopTime;
    if (new Date(formattedStopTime) < new Date(formattedStartTime)) {
      alert("Stop time cant be less than start time");
    }
    else {
      let result;
      let entryData = {
        projectId: this.Project.id,
        startTime: formattedStartTime,
        stopTime: formattedStopTime,
        date: this.dateModel
      }
      result = this._ProjectService.addEntry(entryData);
      result.subscribe((data) => {

      });
    }
  }
  private pad(i: number): string {
    return i < 10 ? `0${i}` : `${i}`;
  }

  getEntries() {
    let queryData = {
      projectId: this.Project.id,
      date: this.dateModel.year + '-' + this.dateModel.month + '-' + this.dateModel.day
    }
    var result = this._ProjectService.getEntries(queryData);
    result.subscribe((response) => {
      if (response.success === "true") {

      }

    });

  }

  closeTimeRegistrationModal() {
    this.activeModal.close();
  }


}
