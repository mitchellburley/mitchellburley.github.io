import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
	faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;

  @Output() next = new EventEmitter<boolean>();

  @Output() previous = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  routeToProjects() {
    this.next.emit(true);
  }

  routeToHome() {
    this.previous.emit(true);
  }


}
