import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import{HttpClient} from '@angular/common/http';
import{Location} from '@angular/common'

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private toastr: ToastrService, private http: HttpClient,private route: Router,private location: Location) { }

  arrMessage: any[]=[];
  showSuccess(user) {

    const body= {
      generalUserName: user.username,
      generalEmail: user.email,
      generalContactPhoneNumber: user.phoneNumber,
      generalPassword: user.passWord,
      generalYourName: user.firstName,
      contactLastName: user.lastName,
    
  "generalSurName": "test",
  "generalCompanyName": "ACL",
  "generalTradingName": "test",
  "generalBusinessAt": "Australian",
  "generalABN": "test",
  "generalCompanyStructureABN": "Sole Trader",
  "generalNZBN": "test",
  "generalCompanyStructureNZBN": "Sole Trader",
  "contactPerson": "test",
  "surNameContactPerson": "test",
  "alternativeContactPerson": "test",
  "surNameAlternativeContactPerson": "test",
  "contactContactNumber": "test",
  "contactAlterContactNumber": "test",
  "contactMobileNumber": "test",
  "contactFaxNumber": "test",
  "contactEmail": "test123@gmail.com",
  "contactPhysicalAddress": "test",
  "address1": "test",
  "address2": "test",
  "contactPhysicalState": "test",
  "contactPhysicalCountry": "test",
  "contactPhysicalPostalCode": "test",
  "contactMailingAddress": "test",
  "mailAddress1": "test",
  "mailAddress2": "test",
  "contactMailingState": "test",
  "contactMailingCountry": "test",
  "contactMailingPostalCode": "test",
  "bankingAccountWithMercature": "test",
  "bankingAccountName": "test",
  "bankingAccountNumberBSB": "test",
  "bankingAccountNumberAccount": "test",
  "bankingConfirmPaymentInUS": "test",
  "bankingSomeoneContactYou": "test",
  "bankingSwiftCode": "test",
  "bankingTransactionIn": "test"
    }
  // var body = "firstName=" + user.firstname + "&lastName=" + user.lastname + "&email=" + user.email+"&phone="+ user.phoneNumber+"&password="+user.passWord+"&confirmpass"+user.confirmPassword
    this.http.post<any>("http://mercature-v1.acc-svrs.com/admin/api/members/postSignUp",JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json'
      }
    }).subscribe(data => {
    //  console.log(data);
      // this.route.navigate(['/signin']);
     if(data && data.data ){
     // this.toastr.success('You are welcom website!', 'You have successfully registered');
      this.arrMessage.push({
        success: true,
        message: "You have successfully registered!"
      })
     }
     else{
      this.arrMessage.push({
        success: false,
        message: "Email already exist!"
      })
     }
     
    },
    err=>{
      this.toastr.error('wrong!', 'You ');
    }
    
    );
  }

  onClose(indexOfArr): void{
      this.arrMessage.splice(indexOfArr,1);
  }
  goBack(): void{
    this.location.back();
  }
  patternFirst = "^(\S*$)";
  selectFirst: string;
  errFirst: string;

  patternEmail = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$";
  selectEmail: string;
  errEmail: string;

  patternPass: any = "^(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";


  selectPass: string;
  errPass: string;

  patternPhone: any = "[0-9]*";
  selectPhone: string;
  errPhone: string;

  username: FormControl;
  signUpForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  phoneNumber: FormControl;
  passWord: FormControl;
  confirmPass: FormControl;

   PasswordStrengthValidator(AC: AbstractControl) {
    let value: string = AC.value || '';
    let err="";
    let uppercaseRegex =/[A-Z]+/g;
    let lowercaseRegex =/[a-z]+/g;
   let specialRegex=/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
   let numberCharacters = /[0-9]+/g;
  
    if (!value) {
      return null
    }

    if(uppercaseRegex.test(value)===false){
      return {  err:`Please enter uppercase`};        
      }
      if(lowercaseRegex.test(value)===false){
        return {  err:`Please enter lowercase`};   
      }
      if(specialRegex.test(value)===false)
      {
        return {  err:`Please enter at least one special character`};
      }
      if(numberCharacters.test(value)===false)
      {
        return {  err:`Please enter at least one number`};
      }
      return null;
  }

 static MatchPassword(AC: AbstractControl) {
    let password = AC.get('passWord').value; // to get value in input tag
    let confirmPassword = AC.get('confirmPass').value; // to get value in input tag
    if (password != confirmPassword) {
      console.log('false');
      AC.get('confirmPass').setErrors({ MatchPassword: true })
    } else {
      console.log('true');
      return null;
    }
  }


  ngOnInit() {
    this.username=new FormControl('',Validators.required);
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.email = new FormControl('', Validators.required);
    this.phoneNumber = new FormControl('', Validators.required);
    this.passWord = new FormControl('', [Validators.required,this.PasswordStrengthValidator]);
    this.confirmPass = new FormControl('', Validators.required);
    this.signUpForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      passWord: this.passWord,
      confirmPass: this.confirmPass,
      username: this.username,
    },
  
      {
        validators: [SignupComponent.MatchPassword]
      }

    )


    this.selectEmail = this.patternEmail;

    if (this.selectEmail === this.patternEmail) {
      this.errEmail = "Email is invalid"
    }
    this.selectPass = this.patternPass;
    if (this.selectPass === this.patternPass) {
      this.errPass = "Pass has at least one special chacracterleast one number";
    }


    this.selectPhone = this.patternPhone;
    if (this.selectPhone === this.patternPhone) {
      this.errPhone = "Phone number must at least 10 digtal number"
    }

 
    

  } //end ngOnInit()
}
