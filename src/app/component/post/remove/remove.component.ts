import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPost } from 'src/app/model/model-interfaces';
import { PaginationService } from 'src/app/service/pagination.service';
import { Location } from '@angular/common';
import { PostService } from 'src/app/service/post.service';
import { Subject } from 'rxjs';

declare let bootstrap: any;

@Component({
  selector: 'app-remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.css']
})
export class RemovePostComponent implements OnInit {

  id: number = 0;
  oPost: IPost;
  strUsuarioSession: string;
  strResult: string = null;

  constructor(
    private oPostService: PostService,
    private oActivatedRoute: ActivatedRoute,
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private _location: Location
  ) {
    // control de sesión
    if (this.oRoute.snapshot.data.message) {
      this.strUsuarioSession = this.oRoute.snapshot.data.message;
      localStorage.setItem("user", this.strUsuarioSession);
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }
    // recogida de parámetros
    this.id = this.oActivatedRoute.snapshot.params.id
    // llamada al servidor
    this.getOne();
  }

  ngOnInit() {
  }

  getOne = () => {
    this.oPostService.getOne(this.id).subscribe((oData: IPost) => {
      this.oPost = oData;
    })
  }

  removeOne() {
    this.oPostService.removeOne(this.id).subscribe((data: number) => {
      if (data) {
        this.strResult = "El post con ID=" + this.id + " ha sido borrado con éxito";        
      } else {
        this.strResult = "Error en el borrado del post";        
      }
      this.openModal();
    })
  }

  goBack() {
    this._location.back();
  }

  //modal

  eventsSubject: Subject<void> = new Subject<void>();

  openModal() {
    this.eventsSubject.next();
  }

  closeModal() {
    this.oRouter.navigate(["/plist"]);
  }

}
