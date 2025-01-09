import { Routes } from '@angular/router';

// ui
import { AppBadgeComponent } from './badge/badge.component';
import { AppChipsComponent } from './chips/chips.component';
import { AppListsComponent } from './lists/lists.component';
import { AppMenuComponent } from './menu/menu.component';
import { AppTooltipsComponent } from './tooltips/tooltips.component';
import { AppFormsComponent } from './forms/forms.component';
import { AppTablesComponent } from './tables/tables.component';
import { ClaimsComponent } from 'src/app/components/claims/claims.component';
import { StockComponent } from 'src/app/components/stock/stock.component';
import { InsuranceComponent } from 'src/app/components/insurance/insurance.component';
import { UpdateInsuranceComponent } from 'src/app/components/update-insurance/update-insurance.component';
import { ForecastComponent } from 'src/app/components/forecast/forecast.component';
import { UpdateForecastComponent } from 'src/app/components/update-forecast/update-forecast.component';
import { ListpremiumsForecastComponent } from 'src/app/components/listpremiums-forecast/listpremiums-forecast.component';
import { ClientstockComponent } from 'src/app/client/clientstock/clientstock.component';
import { ListeforcastComponent } from 'src/app/client/listeforcast/listeforcast.component';
import { ListeclaimsComponent } from 'src/app/client/listeclaims/listeclaims.component';
import { ListeinsurancesComponent } from 'src/app/client/listeinsurances/listeinsurances.component';
import { AddinsuranceComponent } from 'src/app/client/addinsurance/addinsurance.component';
import { ListpremuimsComponent } from 'src/app/client/listpremuims/listpremuims.component';
import { AddclaimsComponent } from 'src/app/client/addclaims/addclaims.component';
import { AddpredictionComponent } from 'src/app/client/addprediction/addprediction.component';
import { CoursesComponent } from 'src/app/formations/courses/courses.component';
import { LessonsComponent } from 'src/app/formations/lessons/lessons.component';
import { AddlessonsComponent } from 'src/app/formations/addlessons/addlessons.component';
import { ContestsComponent } from 'src/app/formations/contests/contests.component';
import { AddcontestComponent } from 'src/app/formations/addcontest/addcontest.component';
import { GamesComponent } from 'src/app/formations/games/games.component';
import { AddgameComponent } from 'src/app/formations/addgame/addgame.component';
import { ListcoursesComponent } from 'src/app/client/listcourses/listcourses.component';
import { DetailsComponent } from 'src/app/client/details/details.component';
import { MyformationComponent } from 'src/app/client/myformation/myformation.component';
export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'badge',
        component: AppBadgeComponent,
      },
      {
        path: 'chips',
        component: AppChipsComponent,
      },
      {
        path: 'addInsurance/:id/:idstock',
        component: AddinsuranceComponent,
      },
      {
        path: 'lists',
        component: AppListsComponent,
      },
      {
        path: 'menu',
        component: AppMenuComponent,
      },
      {
        path: 'tooltips',
        component: AppTooltipsComponent,
      },
      {
        path: 'stock',
        component: StockComponent,
      },
      {
        path: 'list-forcast',
        component: ListeforcastComponent,
      },
      {
        path: 'list-claims',
        component: ListeclaimsComponent,
      },
      {
        path: 'list-stock',
        component: ClientstockComponent,
      },{
        path: 'list-insurance',
        component: ListeinsurancesComponent,
      },{
        path: 'insurance',
        component: InsuranceComponent,
      },
      { path: 'myformation', component: MyformationComponent },

      { path: 'details/:id', component: DetailsComponent },
      { path: 'list-course', component: ListcoursesComponent },
      { path: 'addgame/:id', component: AddgameComponent },
      { path: 'addcontest/:id', component: AddcontestComponent },
      { path: 'addcour/:id', component: AddlessonsComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'games', component: GamesComponent },
      { path: 'contests', component: ContestsComponent },
      { path: 'lessons', component: LessonsComponent },
      { path: 'listpremiums', component: ListpremuimsComponent },
      { path: 'addclaims/:id', component: AddclaimsComponent },
      { path: 'addprediction/:id', component: AddpredictionComponent },
      { path: 'premiums', component: ListpremiumsForecastComponent },
      { path: 'update-forecast/:id', component: UpdateForecastComponent },
      {
        path: 'forecast',
        component: ForecastComponent,
      },
      { path: 'update-insurance/:idInsurance', component: UpdateInsuranceComponent },
      {
        path: 'forms',
        component: AppFormsComponent,
      },
      {
        path: 'tables',
        component: AppTablesComponent,
      },
      {
        path: 'claims',
        component: ClaimsComponent,
      },
    ],
  },
];
