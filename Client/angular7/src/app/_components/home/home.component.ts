import { Component } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { first } from 'rxjs/operators';

import { User } from '../../_models';
import { UserService, AuthenticationService } from '../../_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    currentUser: User;
    userFromApi: User;
    testUser: User;

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService,
        protected localStorage: LocalStorage
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
        // let user: User = { firstName: 'Henri', lastName: 'Bergson' };
        this.localStorage.removeItem('user').subscribe(() => {});
        this.localStorage.setItem('user', this.currentUser).subscribe(() => { });
    }

    ngOnInit() {
        this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
            this.userFromApi = user;
        });
        this.localStorage.getItem<User>('user').subscribe((user:User) => {
            this.testUser = user; // should be 'Henri'
        });
    }
}