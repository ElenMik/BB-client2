import { LoginComponent } from './component/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LogoutComponent } from './component/logout/logout.component';
import { SessionResolver } from './resolve/session.resolve';
import { PlistPostComponent } from './component/post/plist/plist.component';
import { ViewPostComponent } from './component/post/view/view.component';
import { NewPostComponent } from './component/post/new/new.component';
import { EditPostComponent } from './component/post/edit/edit.component';
import { RemovePostComponent } from './component/post/remove/remove.component';
import { ReadComponent } from './component/read/read.component';


const routes: Routes = [
  { path: '', component: HomeComponent, resolve: { message: SessionResolver } },
  { path: 'home', component: HomeComponent, resolve: { message: SessionResolver } },
  { path: 'login', component: LoginComponent, resolve: { message: SessionResolver } },
  { path: 'logout', component: LogoutComponent, resolve: { message: SessionResolver } },  
  { path: 'plist', component: PlistPostComponent, resolve: { message: SessionResolver } },
  { path: 'new', component: NewPostComponent, resolve: { message: SessionResolver } },
  { path: 'view/:id', component: ViewPostComponent, resolve: { message: SessionResolver } },
  { path: 'edit/:id', component: EditPostComponent, resolve: { message: SessionResolver } },
  { path: 'remove/:id', component: RemovePostComponent, resolve: { message: SessionResolver } },
  { path: 'read/:id', component: ReadComponent, resolve: { message: SessionResolver } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
