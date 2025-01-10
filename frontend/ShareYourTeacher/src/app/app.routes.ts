import { Routes } from '@angular/router';
import { CreateRoomComponent } from './components/PageComponent/main-page/create-room/create-room.component';
import { JoinRoomComponent } from './components/PageComponent/main-page/join-room/join-room.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';

export const routes: Routes = [
    {
        path: '', component: MainPageComponent
    },
    {
        path: 'about-us', component: AboutUsComponent
    },
    {
        path: 'create-room', component: CreateRoomComponent
    },
    {
        path: 'join-room', component: JoinRoomComponent
    },
    {
        path: 'portfolio', component: PortfolioComponent
    }
];
