import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  { path: 'projects', component: ProjectsComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'about', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
