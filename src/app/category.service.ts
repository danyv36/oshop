import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    // return this.db.list('/categories').valueChanges();
    return this.db.list('categories').snapshotChanges().pipe(
      map(changes => {
        return changes.map(c=>({
          key: c.payload.key,
          ...c.payload.val()
        }))
      })
    );
  }

}
