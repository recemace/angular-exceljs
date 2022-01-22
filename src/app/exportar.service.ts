import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ExportarService {

  constructor(private http: HttpClient) { }

  async listaracuerdos(){
    return await this.http.get<any>('http://161.132.175.94:4005/documentos/acuerdos').toPromise()
  }

}