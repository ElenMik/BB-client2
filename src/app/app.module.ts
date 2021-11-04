import { PaginationService } from './service/pagination.service';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { LogoutComponent } from './component/logout/logout.component';
import { MenuComponent } from './component/menu/menu.component';
import { SessionService } from './service/session.service';
import { HttpClientModule } from "@angular/common/http";
import { SessionResolver } from './resolve/session.resolve';
import { PlistPostComponent } from './component/post/plist/plist.component';
import { PostService } from './service/post.service';
import { TrimPipe } from './pipe/trim.pipe';
import { showDateTimePipe } from './pipe/showDateTime.pipe';
import { ViewPostComponent } from './component/post/view/view.component';
import { FooterComponent } from './component/footer/footer.component';
import { NewPostComponent } from './component/post/new/new.component';
import { EditPostComponent } from './component/post/edit/edit.component';
import { showBooleanPipe } from './pipe/showBoolean.pipe';
import { RemovePostComponent } from './component/post/remove/remove.component';
import { ModalComponent } from './component/modal/modal.component';
import { DateTimeService } from './service/datetime.service';
import { HeaderComponent } from './component/header/header.component';
import { ReadComponent } from './component/read/read.component';


@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    LoginComponent,
    HomeComponent,  
    LogoutComponent,
    ReadComponent,
    PlistPostComponent,
    ViewPostComponent,
    NewPostComponent,
    EditPostComponent,
    RemovePostComponent,
    TrimPipe,
    showDateTimePipe,
    showBooleanPipe,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    SessionService,
    SessionResolver,
    PostService,
    PaginationService,
    DateTimeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
