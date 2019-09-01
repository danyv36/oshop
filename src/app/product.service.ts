import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  get(productId) {
    return this.db.object('/products/' + productId).valueChanges().pipe( take(1));
  }

  getAll(): Observable<any> {
    return this.db.list('products').snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => ({
          key: c.payload.key,
          ...c.payload.val()
        }));
      })
    );
  }

  update(productId, product) {
    return this.db.object('/products/'+productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/'+productId).remove();
  }
}
