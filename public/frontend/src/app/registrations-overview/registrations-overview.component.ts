import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from '../services/project.service';


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

    });

  }

  closeRegistrationsOverviewModal() {
    this.activeModal.close();
  }


}
