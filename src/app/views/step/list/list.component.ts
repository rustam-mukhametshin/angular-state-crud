import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  users$!: Observable<any>;

  constructor(
    private readonly httpClient: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.users$ = this.httpClient.get('https://jsonplaceholder.typicode.com/users');
  }

}
