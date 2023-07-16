import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TriviaFormComponent } from './trivia-form/trivia-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/trivia-quiz', pathMatch: 'full' },
  { path: 'trivia-quiz', component: TriviaFormComponent },
  {
    path: 'result',
    loadChildren: () =>
      import('./quiz-result/quiz-result-routing.module').then(
        (m) => m.QuizResultModule
      ),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
