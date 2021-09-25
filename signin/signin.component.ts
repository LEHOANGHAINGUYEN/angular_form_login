import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  dismissible: true;
  username: FormControl;
  password: FormControl;
  profileForm: FormGroup;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router,private toast: ToastrService) {
  }

  routerUrl: string;
  ngOnInit() {
    this.routerUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.username = new FormControl('loan1@yopmail.com', Validators.required);
    this.password = new FormControl('123456', Validators.required);
    this.profileForm = new FormGroup({
      username: this.username,
      password: this.password
    })

    console.log(this.routerUrl);
  }

  loading: boolean;
   error: "";
   arrMessage=[];
   
  login(user) {
    this.loading = true;
    const log = {
      email: user.username,
      password: user.password
    }
    this.http.post<any>('http://mercature-v1.acc-svrs.com/admin/api/members/postLogin', JSON.stringify(log),
      {
        headers: {
          'Content-Type': 'application/json',
         
        }
      })
      .subscribe(data => {
                  console.log(data);
                  console.log(data.data);
              //    console.log(JSON.parse(JSON.stringify(data.data)));
               this.router.navigate(['/home']);
         if (data && data.data) {
    
           localStorage.setItem('token',JSON.stringify(data.data));
         this.arrMessage.push({
            success:true,
            message:"You have logged in successfully"
          })
          this.router.navigate(['/admin']);

         this.loading=false;
        }else{
         this.arrMessage.push({
            success:false,
            message:"Wrong"
          })
          console.log(data);
          this.loading=false;
       }
      
        return data;
      },
        error => {
      
        this.error=error;
        this.loading=false;
      }
       )

  }
  onClose(indexOfMessage: any): void{
      this.arrMessage.splice(indexOfMessage,1);
  }


}
