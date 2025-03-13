import config from '~/config';
// pages
import Home from '~/pages/Home';
import Alphabet from '~/pages/Alphabet';
import AlphabetDetail from '~/pages/Alphabet/AlphabetDetail';
import Grammar from '~/pages/Grammar';
import GrammarDetail from '~/pages/Grammar/EnglishGrammar/GrammarDetail';
import Films from '~/pages/Films';

const publicRoutes = [
    
];

const privateRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.alphabet, component: Alphabet },
    { path: config.routes.alphabetDetail, component: AlphabetDetail },
    { path: config.routes.grammar, component: Grammar },
    { path: config.routes.grammarDetail, component: GrammarDetail },
    { path: config.routes.films, component: Films },
];

export { publicRoutes, privateRoutes };
