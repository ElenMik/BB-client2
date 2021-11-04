import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'blogBUSTER-client-2021';

  constructor(private oRoute: ActivatedRoute) {
    if (this.oRoute.snapshot.data.message) {
      localStorage.setItem("user", this.oRoute.snapshot.data.message);
    } else {
      localStorage.clear();
    }
  }

  reset() {
    this.title = 'blogBUSTER';
  }

  ngOnInit(): void {
  }

}