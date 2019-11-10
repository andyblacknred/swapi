import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GetInfoService {

  constructor(private http: HttpClient) { }

  private listWithObjects: any = {results: []};
  private infoAboutObject: Object;
  private listWithObjectsResults: any;
  private sortDirectionReverse: boolean = false;
  private categoryUrl: string;

  getNavList = () => {
    let categories: Array<{name: string, link: string}> = [];
    this.http.get('https://swapi.co/api/').subscribe((res) => {
      for (var prop in res) {
        categories.push({name: prop, link: res[prop]})
      }
    });
    return categories;
  };

  sort = () => {
    this.listWithObjectsResults.sort(function(a: any, b: any) {
      var textA = a.name.toUpperCase() || a.title.toUpperCase();
      var textB = b.name.toUpperCase() || b.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    if (this.sortDirectionReverse) {
      this.listWithObjectsResults.reverse();
    }
  };

  changeSortDirection = () => {
    this.sortDirectionReverse = !this.sortDirectionReverse;
    this.sort();
  };

  getListWithObjects = (event) => {
    this.categoryUrl = event.target.getAttribute('data-link');
    if (this.categoryUrl != null) {
      this.http.get(this.categoryUrl).subscribe( (res: any) => {
        this.listWithObjects = res;
        this.listWithObjectsResults = res.results || [];
        this.sort();
        return res;
      })
    }
    event.target.parentElement.querySelectorAll('li').forEach(function (listItem) {
       listItem.classList.remove('active');
    });
    event.target.classList.add('active');
  };

  search = (event) => {
    let url = `${this.categoryUrl}?search=${event.target.value}`;
    this.http.get(url).subscribe( (res: any) => {
      this.listWithObjects = res;
      this.listWithObjectsResults = res.results || [];
      this.sort();
      return res;
    })
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
