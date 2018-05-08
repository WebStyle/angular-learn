import {Component, Input, OnInit} from '@angular/core';
import {IPerson} from '../model/Person';
import {IUser} from '../model/User';
import {HttpClient} from '@angular/common/http';
import {IAlbum} from '../model/Album';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  @Input() person: IUser;
  albums: IAlbum[] = [];
  photos: any[] = []
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('https://jsonplaceholder.typicode.com/albums?userId=' + this.person.id).toPromise().then((albums: IAlbum[]) => {
      this.albums = albums;
    });
  }

  viewAlbum(i, id: number) {
    console.log(id);
    this.http.get('https://jsonplaceholder.typicode.com/photos?albumId=' + id).toPromise().then((res: any[]) => {
      this.albums[i].photos = res;
    });
  }

}
