import { Component, OnInit } from '@angular/core';
import { GetInfoService } from "../../services/get-info.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})

export class HeaderComponent implements OnInit {

  constructor( private getInfoSrvc: GetInfoService ) { }

  private categories = this.getInfoSrvc.getNavList();

  ngOnInit() {

  }



}
