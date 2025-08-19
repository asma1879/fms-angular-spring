import { Injectable } from '@angular/core';
import {
CanActivate,
ActivatedRouteSnapshot,
RouterStateSnapshot,
UrlTree,
Router
} from '@angular/router';

@Injectable({
providedIn: 'root'
})
export class RoleGuard implements CanActivate {

constructor(private router: Router) {}

canActivate(
route: ActivatedRouteSnapshot,
state: RouterStateSnapshot
): boolean | UrlTree {
const userData = localStorage.getItem('user');


if (!userData) {
  // User not logged in
  return this.router.createUrlTree(['/login']);
}

const user = JSON.parse(userData);
const allowedRoles = route.data['roles'] as string[];

if (user.role && allowedRoles.includes(user.role)) {
  return true;
}

// User is logged in but doesn't have the required role
return this.router.createUrlTree(['/']);
}
}