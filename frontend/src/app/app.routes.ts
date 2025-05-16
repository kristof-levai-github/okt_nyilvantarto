import { Routes } from '@angular/router'; 
import { provideHttpClient } from '@angular/common/http';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home-page/home-page.component').then(m => m.HomePageComponent)
  },
  {
    path: 'students',
    loadComponent: () =>
      import('./pages/students-page/students-page.component').then(m => m.StudentsPageComponent),
    providers: [provideHttpClient()]
  },
  {
    path: 'teachers',
    loadComponent: () =>
      import('./pages/teachers-page/teachers-page.component').then(m => m.TeachersPageComponent),
    providers: [provideHttpClient()]
  },
  {
    path: 'subjects',
    loadComponent: () =>
      import('./pages/subjects-page/subjects-page.component').then(m => m.SubjectsPageComponent),
    providers: []
  },
  
  {
    path: 'courses',
    loadComponent: () => 
      import('./pages/courses-page/courses-page.component').then(m => m.CoursesPageComponent),
    providers: []
  },

  {
    path: 'grades',
    loadComponent: () => import('./pages/grades-page/grades-page.component').then(m => m.GradesPageComponent)
  },

  {
    path: 'statistics',
    loadComponent: () => import('./pages/statistics-page/statistics-page.component').then(m => m.StatisticsPageComponent)
  }
];
