// // import { Injectable } from '@angular/core';
// // import { HttpClient } from '@angular/common/http';
// // import { Observable } from 'rxjs';
// // import { Project } from '../models/project.model';

// // @Injectable({ providedIn: 'root' })
// // export class ProjectService {
// //   private apiUrl = 'http://localhost:8080/api/projects';

// //   constructor(private http: HttpClient) {}

// //   getProjects(): Observable<Project[]> {
// //     return this.http.get<Project[]>(this.apiUrl);
// //   }

// //   addProject(project: Project): Observable<Project> {
// //     return this.http.post<Project>(this.apiUrl, project);
// //   }

// //   updateProject(project: Project): Observable<Project> {
// //     return this.http.put<Project>(`${this.apiUrl}/${project.id}`, project);
// //   }

// //   deleteProject(id: number): Observable<any> {
// //     return this.http.delete(`${this.apiUrl}/${id}`);
// //   }
// // }

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({ providedIn: 'root' })
// export class ProjectService {
//   private apiUrl = 'http://localhost:8080/api/projects'; // Change this to match your backend

//   constructor(private http: HttpClient) {}

//   getProjects(): Observable<any[]> {
//     return this.http.get<any[]>(this.apiUrl);
//   }

//   updateProject(id: number, project: any): Observable<any> {
//     return this.http.put(`${this.apiUrl}/${id}`, project);
//   }

//   deleteProject(id: number): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/${id}`);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Project {
  id?: number;
  title: string;
  description: string;
  budget: number;
  skills: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = 'http://localhost:8080/api/projects';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.baseUrl);
  }

  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.baseUrl, project);
  }

  updateProject(id: number, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.baseUrl}/${id}`, project);
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
