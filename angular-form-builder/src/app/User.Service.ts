import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }
  getUser(id) {
    return this.httpClient.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
  }
  updateUser(user: User) {
    return this.httpClient.put(`https://jsonplaceholder.typicode.com/posts/${user.userId}`, user);
  }
  createUser(user: User) {
    return this.httpClient.post(`https://jsonplaceholder.typicode.com/posts/`, user);
  }
}

export class User {
  constructor() {
    this.userId = ""
    this.id = ""
    this.title = ""
    this.completed = ""
  }
  userId: string;
  id: string;
  title: string;
  completed: string;
}