import {
  Component,
  HostListener,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';

interface userStructure {
  user_id: number;
  username: string;

  email: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isScrolled: boolean = false;
  activeSection: string = 'home';
  mobilelView: boolean = false;
  mobileToogleIcon: string = 'list';
  userDetails!: userStructure;
  isUserLogedIn: boolean = false;

  constructor(private router: Router) {}

  isLogInVerify() {
    const dataFromLocalStorage = localStorage.getItem('UserData');
    if (dataFromLocalStorage) {
      this.isUserLogedIn = true;
    }
    return this.isUserLogedIn;
  }

  ngOnInit(): void {
    let userData: any = localStorage.getItem('UserData');
    userData = JSON.parse(userData);
    this.userDetails = userData;

    this.isLogInVerify();
  }

  hideMobileView() {
    this.mobilelView = false;
    this.mobileToogleIcon === 'list'
      ? (this.mobileToogleIcon = 'close')
      : (this.mobileToogleIcon = 'list');
  }

  toogleMobileView() {
    this.mobilelView = !this.mobilelView;
    this.mobileToogleIcon === 'list'
      ? (this.mobileToogleIcon = 'close')
      : (this.mobileToogleIcon = 'list');
  }

  logoutClick() {
    const tokenFromLocalStorage = localStorage.getItem('UserToken');
    const dataFromLocalStorage = localStorage.getItem('UserData');
    if (tokenFromLocalStorage) {
      localStorage.removeItem('UserToken');
    }
    if (dataFromLocalStorage) {
      localStorage.removeItem('UserData');
    }
    this.isUserLogedIn = false;
    this.router.navigate(['/login']);
  }

  get isLogin() {
    return this.isLogInVerify();
  }
}
