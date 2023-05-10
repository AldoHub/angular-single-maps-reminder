import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, map, mergeMap } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(private http: HttpClient) { }
  
  

  simpleSearch$!: Observable<any>;
  searchResults$!: Observable<any>;
  users!: any[];

  simpleSearch(){
    this.simpleSearch$ = this.http.get(`https://jsonplaceholder.typicode.com/todos`).pipe(
      map( (results:any) => {
        return results;
      })
    );
  }

  search() {
    this.searchResults$ = this.http.get(`https://jsonplaceholder.typicode.com/todos`).pipe(
      switchMap((results: any) => {
        // Do any additional processing of results here
       
        return results;
      })
    );

  }


  /**
   * first fetch a list of posts from the JSONPlaceholder API, and then fetch the user associated with the first post.
   * Once we have the user data, we assign it to the users property of the component, which is used to display the user's name in the template.
   * 
   */
  getUsers(){
    this.http.get('https://jsonplaceholder.typicode.com/posts').pipe(
      mergeMap((posts: any) => this.http.get(`https://jsonplaceholder.typicode.com/users/${posts[0].userId}`))
    ).subscribe(user => {
      console.log("---->", user)
      this.users = [user];
    });
  }





  ngOnInit(): void {
    this.simpleSearch();
    this.search();
    this.getUsers();
  }

  



}
