import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{WebsiteloginComponent} from './websitelogin.component';
import { SigninComponent } from '../websitelogin/signin/signin.component'
import{Routes, RouterModule} from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';


// import{User} from './model/user'
export const routerChild: Routes = [
  {path: '', component: WebsiteloginComponent}
//   children:[
   
//  ]}
 , {path:'signup',component:SignupComponent} 
 
]
@NgModule({
  declarations: [
    WebsiteloginComponent,
    SigninComponent,
    SignupComponent
  
  ],
  imports: [

    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routerChild)
  ],


  exports:[WebsiteloginComponent,SigninComponent]
})
export class WebsiteloginModule { }
