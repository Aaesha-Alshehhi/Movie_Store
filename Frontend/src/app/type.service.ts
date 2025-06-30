import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Type } from './type';
import { Movie } from './movie';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  private apiUrl = 'http://localhost:8085';

  constructor(private http: HttpClient) { }

  getTypeWithMovies(typeId: number): Observable<Type> {
    return this.http.get<Type>(`${this.apiUrl}/type/${typeId}`);
  }

  addMovieToType(typeId: number, movie: Movie): Observable<Type> {
    return this.http.post<Type>(`${this.apiUrl}/type/add/${typeId}`, movie);
  }

  getAllTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(`${this.apiUrl}/types`);
  }

  deleteType(typeId:number){
    return this.http.delete(`${this.apiUrl}/type/${typeId}`);
  }

  updateType(typeId: number, value: any): Observable<Object>{
    return this.http.put(this.apiUrl  +'/type/'+typeId,value);
  }

  createType(type: Omit<Type, 'typeID'>): Observable<Type> {
    return this.http.post<Type>(`${this.apiUrl}/type`, { typeName: type.typeName });
  }
}
