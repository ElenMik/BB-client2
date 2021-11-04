import { PaginationService } from './../../../service/pagination.service';
import { PostService } from './../../../service/post.service';
import { Component, OnInit } from '@angular/core';
import { IPage, IPost, IPost2Send } from 'src/app/model/model-interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DateTimeService } from 'src/app/service/datetime.service';


@Component({
  selector: 'app-plist',
  templateUrl: './plist.component.html',
  styleUrls: ['./plist.component.css']
})
export class PlistPostComponent implements OnInit {

  aPosts: IPost[];
  oPost2send: IPost2Send ={
    id:null,
    titulo:"",
    cuerpo:"",
    etiquetas:"",
    fecha:"",
    visible:null,
};
  totalElements: number;
  totalPages: number;
  page: number;
  campo: string;
  orden: boolean;
  barraPaginacion: string[];
  pageSize: number = 10;
  id: number = null;
  oPost:IPost;

  strUsuarioSession: string;
  StringDate: string;

  constructor(
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oPaginationService: PaginationService,
    private oPostService: PostService, 
    private DateTime2show:DateTimeService, 
  ) {

    if (this.oRoute.snapshot.data.message) {
      this.strUsuarioSession = this.oRoute.snapshot.data.message;
      localStorage.setItem("user", this.oRoute.snapshot.data.message);
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }

    this.page = 1;
    this.campo="id";
    this.orden=true;    
    this.getPage();
  }

  ngOnInit(): void {
  }

  getPage = () => {
    this.oPostService.getPage(this.pageSize, this.page,this.campo,this.orden).subscribe((oPage: IPage) => {
      this.aPosts = oPage.content;
      this.totalElements = oPage.totalElements;
      this.totalPages = oPage.totalPages;
      this.barraPaginacion = this.oPaginationService.pagination(this.totalPages, this.page);
    })
  }

  changevisible = (id:number) => {
    console.log(id);
    this.oPostService.getOne(id).subscribe((oData: IPost) => {
      this.StringDate = this.DateTime2show.getStrFecha2Send(this.DateTime2show.getStrFecha2Show(oData.fecha));
      this.oPost2send={
        id:oData.id,
        titulo:oData.titulo,
        cuerpo:oData.cuerpo,
        etiquetas:oData.etiquetas,
        fecha:this.StringDate,
        visible:oData.visible,
      }
      this.oPost2send.visible = !this.oPost2send.visible
      this.update();
      }
      

    )

    
  }

  update = () =>{
    console.log(this.oPost2send);
      this.oPostService.updateOne(this.oPost2send).subscribe((ok:number) => {
      console.log(ok);
      this.getPage();
      })
  }

  
  jumpToPage = () => {
    this.getPage();
    return false;
  }
  
  eventsSubject: Subject<void> = new Subject<void>();

  openModal(id:number):void {
    this.eventsSubject.next();
    this.oPostService.getOne(id).subscribe(data=>{
      this.oPost=data;
    })
  }

  closeModal():void {
    this.oRouter.navigate(["/plist/" ]);
  }
 
  
  }


