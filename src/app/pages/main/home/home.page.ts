import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { UtilsService } from 'src/app/services/utils.service';
import { Posts } from 'src/assets/data/images';
import { PostDetailComponent } from 'src/app/shared/components/post-detail/post-detail.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  

  posts: Post[] = [];
  loading: boolean = false;


  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email] ),
    phone: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  constructor(private utilsSvc: UtilsService) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getPosts();
  }

  doRefresh(event: any){
    setTimeout(() => {
      this.getPosts();
        
      event.target.complete()
    }, 1000);
  }

  getPosts() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.posts = Posts;
    }, 1000);
    console.log(this.posts);
  }

  async showPostDetail(post: Post) {
    await this.utilsSvc.presentModal({
      component: PostDetailComponent,
      componentProps: { post },
      cssClass: 'modal-full-size',
    });
  }
}
