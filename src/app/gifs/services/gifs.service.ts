import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Gif, SearcGIFResponse } from '../interface/gifs.interface';
import { ignoreElements } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'J92hZT17w74fTixRgj9pSwp2eXDZYR5d'
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs'
  private _historial: string[] = []

  public resultados: Gif[] = [];


  get historial() {
    return [...this._historial]
  }

  constructor(private http: HttpClient) {
    if( localStorage.getItem('historial')){
    this._historial = JSON.parse(localStorage.getItem('historial')!)
    }

    if(localStorage.getItem('resultados')){
      this.resultados =JSON.parse(localStorage.getItem('resultados')!)
    }
   }



  buscarGifs(query: string) {

    query = query.trim().toUpperCase()
    if (!this._historial.includes(query)) {
      this._historial.unshift(query)
      this._historial = this._historial.splice(0, 10)

      localStorage.setItem('historial', JSON.stringify(this._historial));

    }
    const params =new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', query);

    console.log(params.toString);


    this.http.get<SearcGIFResponse>(`${this.servicioUrl}/search`, {params:params}).subscribe((r) => {
      this.resultados = r.data
      localStorage.setItem('resultados', JSON.stringify(this.resultados));

    })

  }

}
