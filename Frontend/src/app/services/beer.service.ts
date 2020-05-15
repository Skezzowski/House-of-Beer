import { Injectable } from '@angular/core';
import { Beer } from '../beers/beer.model';

@Injectable({
  providedIn: 'root'
})
export class BeerService {

  constructor() { }

  private beerList: Beer[] = [
    new Beer('0', 'Sörnév', 'sör leírása', 'sör típusa', 'sör hozzávalói', 'assets/pictures/beer1.jpg', 'elkészítési idő'),
    new Beer('1', 'Sörnév 2', 'sör leírása 2', 'sör típusa 2', 'sör hozzávalói 2', 'assets/pictures/beer2.jpg', 'elkészítési idő 2'),
    new Beer('2', 'Sörnév 3', 'sör leírása 3', 'sör típusa 3', 'sör hozzávalói 3', 'assets/pictures/beer3.jpg', 'elkészítési idő 3')
  ];

  getBeers(): Beer[] {
    return this.beerList.slice();
  }

  getBeer(id: string): Beer {
    let beer: Beer;
    this.beerList.forEach(e => {
      if (e.id === id) {
        beer = e;
      }
    });
    return beer;
  }
}
