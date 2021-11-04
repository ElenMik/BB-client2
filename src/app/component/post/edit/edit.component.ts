import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IPost, IPost2Send } from 'src/app/model/model-interfaces';
import { PostService } from 'src/app/service/post.service';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { DateTimeService } from 'src/app/service/datetime.service';

declare let $: any;

@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditPostComponent implements OnInit {

  oPost2Show: IPost = null;
  oPost2Send: IPost2Send = null;
  id: number = null;
  oForm: FormGroup = null;
  strResult: string = null;

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

    this.id = this.oActivatedRoute.snapshot.params.id
    this.getOne();

  }

  ngOnInit(): void {
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

  getOne = ():void => {
    this.oPostService.getOne(this.id).subscribe((oData: IPost) => {
      this.oPost2Show = oData;
      this.oForm = this.oFormBuilder.group({
        id: [this.oPost2Show.id],
        titulo: [this.oPost2Show.titulo, [Validators.required, Validators.minLength(5)]],
        cuerpo: [this.oPost2Show.cuerpo, Validators.required],
        etiquetas: [this.oPost2Show.etiquetas, Validators.required],
        fecha: [this.oDateTimeService.getStrFecha2Show(this.oPost2Show.fecha), Validators.required],  //, Validators.pattern(this.fechaHoraPattern)
        visible: [this.oPost2Show.visible]
      });
    })
  }

  onSubmit(): void {
    if (this.oForm) {
      this.oPost2Send = {
        id: this.oForm.value.id,
        titulo: this.oForm.value.titulo,
        cuerpo: this.oForm.value.cuerpo,
        etiquetas: this.oForm.value.etiquetas,
        fecha: this.oDateTimeService.getStrFecha2Send(this.oForm.value.fecha), //this.getStrFecha2Send($('#fecha').val()),
        visible: this.oForm.value.visible
      }

      this.update();
    }
  }

  update = ():void => {
    this.oPostService.updateOne(this.oPost2Send).subscribe((result: number) => {
      if (result) {
        this.strResult = "El post se ha modificado correctamente";
      } else {
        this.strResult = "Error en la modificación del post";
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
