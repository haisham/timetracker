import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from '../services/project.service';
import * as moment from 'moment';


@Component({
  selector: 'app-registrations-overview',
  templateUrl: './registrations-overview.component.html',
  styleUrls: ['./registrations-overview.component.css'],
  providers: [ProjectService]
})
export class RegistrationsOverviewComponent implements OnInit {

  successMessage: boolean;
  errorMessage: boolean;
  successMessageText: string;
  errorMessageText: string;
  TimeRegistrations: any;
  TotalTime: string;

  @Input() Project;
  constructor(private _ProjectService: ProjectService, private activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.getEntries();
  }


  getEntries() {

    var result = this._ProjectService.getEntries(this.Project.id);
    result.subscribe((response) => {
      this.TimeRegistrations = response[0].entries;
      this.TotalTime = this.totalTime(response[0].entries);

    });

  }

  removeRegistration(id) {

    var result = this._ProjectService.removeEntry(id);
    result.subscribe((response) => {
      this.getEntries();
    });

  }

  totalTime(entries) {
    let durations = [];
    for (var key in entries) {
      let hourMinute = entries[key].time_spent.split(':');
      let hourMinuteFormatted = `${this.pad(hourMinute[0])}:${this.pad(hourMinute[1])}:00`;
      durations.push(hourMinuteFormatted);
    }
    const totalDurations = durations.slice(1)
      .reduce((prev, cur) => moment.duration(cur).add(prev),
        moment.duration(durations[0]));
    
    return (`${moment.utc(totalDurations.asMilliseconds()).format("HH:mm")}`);

  }

  private pad(i: number): string {
    return i < 10 ? `0${i}` : `${i}`;
  }


  closeRegistrationsOverviewModal() {
    this.activeModal.close();
  }


}
