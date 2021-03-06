import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Users } from "../models/user.model";

@Injectable()
export class AuthGuardNurse implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (localStorage.getItem("user")) {
      const u = <Users>JSON.parse(localStorage.getItem("user"));
      if (u.IsNurse) return true;
      else {
        this.router.navigateByUrl("/login-nurse");
        return false;
      }
    } else {
      this.router.navigateByUrl("/login-nurse");
      return false;
    }
  }
}
