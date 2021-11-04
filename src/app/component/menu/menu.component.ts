import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  strUsuarioSession: String;
  strUrl:String="";

  constructor(private router: Router) {    
    
    this.strUsuarioSession = localStorage.getItem("user");

    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.strUrl=ev.url ;
      }
    })
    
  }

  ngOnInit(): void {
  }

}
