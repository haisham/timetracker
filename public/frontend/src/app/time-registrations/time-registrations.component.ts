import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from '../services/project.service';


@Component({
  selector: 'app-time-registrations',
  templateUrl: './time-registrations.component.html',
  styleUrls: ['./time-registrations.component.css'],
  providers: [ProjectService]
})
export class TimeRegistrationsComponent implements OnInit {
  dateModel;
  constructor(private _ProjectService: ProjectService, private activeModal: NgbActiveModal, private calendar: NgbCalendar) {
  }

  ngOnInit() {
    this.dateModel = this.calendar.getToday();
  }
  closeTimeRegistrationModal() {
    this.activeModal.close();
  }
}
