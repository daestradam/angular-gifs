import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

//const GIPHY_API_KEY: string = 'C5vMRwjuTyklvPgcRL6krehBAuMCu1i4';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'C5vMRwjuTyklvPgcRL6krehBAuMCu1i4';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) { }

  get tagsHistory(){
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string){
    tag = tag.toLowerCase();
    if(this._tagsHistory.includes(tag)){
      this._tagsHistory=this._tagsHistory.filter((oldTag) => oldTag !== tag)
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory.slice(0,10);
  }

  searchTag(tag:string):void{
    if(tag.length === 0) return;

    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)

    //Observable
    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params})
      .subscribe(resp => {
        this.gifList=resp.data;
        console.log({gifs: this.gifList});
      });
  }

  /*async searchTag(tag:string):Promise<void>{
    if(tag.length === 0) return;

    this.organizeHistory(tag);*/

    /*fetch('https://api.giphy.com/v1/gifs/search?api_key=C5vMRwjuTyklvPgcRL6krehBAuMCu1i4&q=hola&limit=10')
      .then(resp => resp.json())
      .then(data => console.log(data));*/

    /*const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=C5vMRwjuTyklvPgcRL6krehBAuMCu1i4&q=hola&limit=10')
    const data = await resp.json();
    console.log(data);*/

  //}
}
