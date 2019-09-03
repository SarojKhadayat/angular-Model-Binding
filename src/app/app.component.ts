import { Component,OnInit } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {
  name = 'Angular';
  test='saroj';
  userDetail:User={id:1,email:'Saroj.Khadayat@gmail.com',first_Name:'Saroj',last_Name:'Khadayat',avatar:'xyz'};
  isLoading:boolean=true;
  constructor(private http:HttpClient){
    
  }
  ngOnInit(){
   this.getUserDetail().subscribe(result=>{
     //Here user detail is of type User but after api call userDetail attributes are replaced by api object. Mapping is not being done, whole object is being replaced. 
     this.userDetail=result.data;
     this.isLoading=false;
       });
  }
  getUserDetail(){
    let api='https://reqres.in/api/users/2';
    return this.http.get<User>(api).pipe(
    catchError(e=>throwError(e))
  );
}
}
//In this model first_name is changed to fName and last_name to lName
export interface User{
 id:number
 email:string
 avatar:string
 fName:string
 lName:string
}
//This is exactly like api model but we are not using this for now.
// export interface User{
//  id:number
//  email:string
//  avatar:string
//  first_name:string
//  last_name:string
// }