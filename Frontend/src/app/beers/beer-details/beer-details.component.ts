import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { BeerService } from 'src/app/services/beer.service';
import { Beer } from '../beer.model';

@Component({
  selector: 'app-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.scss']
})
export class BeerDetailsComponent implements OnInit {
  beer: Beer;
  id: string;

  constructor(private beerService: BeerService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.beer = this.beerService.getBeer(this.id);
        }
      );
  }

}
