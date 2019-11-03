import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GetInfoService {

  constructor(private http: HttpClient) { }

  private listWithObjects: Object = {};
  private infoAboutObject: Object = [];

  getNavList = () => {
    let categories: Array<{name: string, link: string}> = [];
    this.http.get('https://swapi.co/api/').subscribe((res) => {
      for (var prop in res) {
        categories.push({name: prop, link: res[prop]})
      }
    });
    return categories;
  };

  getListWithObjects = (event) => {
    if (event.target.getAttribute('data-link') != null) {
      this.http.get(event.target.getAttribute('data-link')).subscribe( (res) => {
        this.listWithObjects = res;
        console.log(res);
        return res;
      })
    }
  };

  getInfoAboutObject = (event) => {
    this.http.get(event.target.getAttribute('data-link')).subscribe( (res) => {
      let infoAboutObjectArray: Array<{name: string, value: any[]}> = [];
      for (var prop in res) {
        if (res[prop] instanceof Array) {
          infoAboutObjectArray.push({name: prop, value: res[prop]});
        } else {
          infoAboutObjectArray.push({name: prop, value: [res[prop]]});
        }
      }
      this.infoAboutObject = infoAboutObjectArray;
      return infoAboutObjectArray;
    })
  };

  checkIsUrl(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }
}
