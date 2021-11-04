import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IPost2Send } from 'src/app/model/model-interfaces';
import { PostService } from 'src/app/service/post.service';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { DateTimeService } from 'src/app/service/datetime.service';

declare let $: any;

@Component({
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})

export class NewPostComponent implements OnInit {

  oPost2Send: IPost2Send = null;  
  id: number = 0;
  oForm: FormGroup = null;
  strResult: string = "";

  get f() { return this.oForm.controls; }

  constructor(
    private oFormBuilder: FormBuilder,
    private oRouter: Router,
    private oPostService: PostService,
    private oActivatedRoute: ActivatedRoute,  
    private oLocation: Location,
    private oDateTimeService: DateTimeService
    ) {

    if (this.oActivatedRoute.snapshot.data.message) {
      const strUsuarioSession: string = this.oActivatedRoute.snapshot.data.message;
      localStorage.setItem("user", strUsuarioSession);
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }

  }

  ngOnInit(): void {
    this.oForm = this.oFormBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      cuerpo: ['', Validators.required],
      etiquetas: ['', Validators.required],
      fecha: ['', Validators.required],
      visible: ['']
    });
    $('#fecha').datetimepicker({
      defaultDate: "+1w",
      numberOfMonths: 1,
      dateFormat: 'dd-mm-yy',
      timeFormat: 'hh:mm',
      showAnim: "fold",
      onClose: (dateText: string, inst: any) => {
        this.oForm.controls['fecha'].setValue(dateText);
        this.oForm.controls['fecha'].markAsDirty();
      }
    });
  }

  onSubmit(): void {
    if (this.oForm) {
      this.oPost2Send = {
        id: null,
        titulo: this.oForm.value.titulo,
        cuerpo: this.oForm.value.cuerpo,
        etiquetas: this.oForm.value.etiquetas,
        fecha: this.oDateTimeService.getStrFecha2Send(this.oForm.value.fecha),
        visible: this.oForm.value.visible
      }
      this.new();
    }
  }

  new = ():void => {
    this.oPostService.newOne(this.oPost2Send).subscribe((id: number) => {
      if (id) {
        this.id = id;
        this.strResult = "El post se ha creado correctamente";
      } else {
        this.strResult = "Error en la creación del registro";
      }
      this.openModal();
    })
  }

  goBack():void {
    this.oLocation.back();
  }

  //modal

  eventsSubject: Subject<void> = new Subject<void>();

  openModal():void {
    this.eventsSubject.next();
  }

  closeModal():void {
    this.oRouter.navigate(["/view/" + this.id]);
  }

}
