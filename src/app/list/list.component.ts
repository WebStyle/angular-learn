import {Component, Input, OnInit} from '@angular/core';
import {IPerson} from '../model/Person';
import {IUser} from '../model/User';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  list: IUser[] = [];
  selectedPerson: IUser;
  person: IUser = {
    username: '',
    email: '',
    id: null,
    website: '',
  };
  action = 'save';
  indexForUpdate: number;
  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    console.log('list component init');
    this.http.get('https://jsonplaceholder.typicode.com/users').toPromise().then((res: IUser[]) => {
      this.list = res;
    });
  }

  choosePerson(person: IUser) {
    this.selectedPerson = person;
  }

  save() {
    if (!this.person.username && !this.person.email && !this.person.website) return alert('form error');
    if (this.action === 'save') {
      this.list.push(this.person);
    }
    this.person = {
      username: '',
      email: '',
      id: null,
      website: '',
    };
    this.action = 'save';
  }

  edit(i: number) {
    this.action = 'edit';
    this.person = this.list[i];
    this.indexForUpdate = i;
  }

  remove(i: number) {
    this.list.splice(i, 1);
    this.selectedPerson = null;
  }

}
