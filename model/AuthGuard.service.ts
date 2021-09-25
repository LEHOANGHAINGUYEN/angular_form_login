import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(public router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
       if(localStorage.getItem('token')){
           return true;
       }
       this.router.navigate(['/signin'],{queryParams: {returnUrl: state.url}});
       return false;

    }
   
    
}