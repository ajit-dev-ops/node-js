import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../User.Service'
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms'


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id: string
  user: User
  userForm: FormGroup

  constructor(private activatedRoute: ActivatedRoute, private api: UserService, private formBuilder: FormBuilder) {
    //redundant empty user
    this.user = new User()
    this.userForm = this.createFormGroupWithBuilderAndModel(this.formBuilder);
  }

  async ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    this.getUser()
    
  }
  getUser() {
    this.api.getUser(this.id).subscribe((data: User) =>  {
      this.user = data;
      console.log(data)
      this.userForm = this.createFormGroupWithBuilderAndModel(this.formBuilder);

    });
  }

  UpdateUser() {
    this.api.getUser(this.id).subscribe((data: User) =>  {
      this.user = data;
    });
  }

  createFormGroupWithBuilderAndModel(formBuilder: FormBuilder) {
    return formBuilder.group({
      user: formBuilder.group(this.user),
      text: 'any-text'
    });
  }

  onSubmit() {
    const result = Object.assign({}, this.userForm.value);

    // Do useful stuff with the gathered data
    console.log(result.user);
    this.api.createUser(result.user).subscribe(res => {
      console.log("result of put: " + JSON.stringify(res))
    })
  }
}
