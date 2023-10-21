import { Component, OnInit } from '@angular/core';
import { ProfileServicesService } from '../services/profile-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  userdeatails: any;
  isAdmin: boolean = false;
  userblogPosts: any = null;
  userId!: any;
  page = 1
  pageSize = 3;
 
 

  
  totalPage!:number;


  constructor(
    private profileService: ProfileServicesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userId = this.route.snapshot.paramMap.get('userId');
    const adminUser: any = localStorage.getItem('UserData');

    let data = JSON.parse(adminUser);

    if (data.user_id == this.userId) {
      this.isAdmin = true;
    }

    // console.log(this.isAdmin)
  }


  // selectPage(page: string) {
	// 	this.page = parseInt(page, 10) || 1;
	// }

  // formatInput(input: HTMLInputElement) {
	// 	input.value = input.value.replace(FILTER_PAG_REGEX, '');
	// }

  userDetailService() {
    this.profileService
      .getUserDetails(this.userId)
      .subscribe((response: any) => {
        this.userdeatails = response.data;
      });
  }

  userBlogsDetailsService() {
    this.profileService.getUserPosts(this.userId).subscribe((response: any) => {
      this.userblogPosts = response.data;
    this.totalPage = Math.ceil(this.userblogPosts.length / 5);
      
    });
  }

  ngOnInit(): void {
    this.userDetailService();
    this.userBlogsDetailsService();


    
  }

  onDeleteButtonClick(blogid: any) {
    this.profileService.deleteUserPost(blogid).subscribe((response: any) => {
      this.userBlogsDetailsService();
    });
  }


  
  get displayblePost() {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.userblogPosts.slice(startIndex, endIndex);
  }

  // onLeftArrowClicked() {
  //   if (this.currentPage > 1) {
  //     this.currentPage -= 1;
  //   }
  // }
  // onRightArrowClicked() {
  //   if (this.currentPage < this.totalPage) {
  //     this.currentPage += 1;
  //   }
  // }
}
