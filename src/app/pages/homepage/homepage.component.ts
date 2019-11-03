import { Component, OnInit } from '@angular/core';
import { GetInfoService } from "../../services/get-info.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.sass']
})
export class HomepageComponent implements OnInit {

  constructor(private getInfoSrvc: GetInfoService) { }

  private JSON;

  ngOnInit() {
    this.JSON = JSON;
  }

}
