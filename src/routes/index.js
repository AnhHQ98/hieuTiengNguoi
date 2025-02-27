import Home from '~/pages/Home';
import Vocabulary from '~/pages/Vocabulary';
import Grammar from '~/pages/Grammar';
import Film from '~/pages/Film';

const publicRoutes = [];

const privateRoutes = [
    { path: '/', component: Home },
    { path: '/vocabulary', component: Vocabulary },
    { path: '/grammar', component: Grammar },
    { path: '/film', component: Film },
];

export { publicRoutes, privateRoutes };