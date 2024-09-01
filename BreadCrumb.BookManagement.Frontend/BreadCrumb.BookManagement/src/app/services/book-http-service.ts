import { HttpClient, HttpHeaders } from  '@angular/common/http';
import {v4 as uuidv4} from 'uuid';
import { Injectable } from  '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../book';
import { PaginatedResponse } from './pagination';

export class HttpCallResult {
    data: Book[] = new Array();
    exception : string = "";
    success : boolean = false   
}

@Injectable({
providedIn:  'root'
})

export class BookHttpService {

  private pagedRecordsbooksUrl = environment.booksApi.concat('page');

  constructor(private http: HttpClient) {

  }

  public createBook(book : Book) : Observable<Book> {
        
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });        
    headers.append("Access-Control-Allow-Origin", "*");

    headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    debugger;
    return this.http.post<Book>(environment.booksApi, book, {headers : headers});
  }

  public deleteBooks(ids: String[]) : Observable<void> {
        
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });        
    headers.append("Access-Control-Allow-Origin", "*");

    headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    return this.http.delete<void>(`${environment.booksApi}`, { body : ids });
  }

  public getAllBooks() : Observable<Book[]> {
        
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });        
    headers.append("Access-Control-Allow-Origin", "*");

    headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    return this.http.get<Book[]>(environment.booksApi, {headers : headers});
 }

  public getPagedRecords(pageNumber: Number, pageSize : Number): Observable<PaginatedResponse> {
  
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });        
    headers.append("Access-Control-Allow-Origin", "*");

    headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    return this.http.get<PaginatedResponse>(`${this.pagedRecordsbooksUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`, { headers : headers });
  }
}
