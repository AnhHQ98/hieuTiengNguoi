import config from '~/config';

import Home from '~/pages/Home';

import {
    Alphabet,
    EnglishAlphabet,
    JapaneseAlphabet,
    ChineseAlphabet,
    KoreanAlphabet,
    FrenchAlphabet,
} from '~/pages/Alphabet';

import {
    Grammar,
    EnglishGrammar,
    EnglishTenses,
    PresentTense,
    PastTense,
    FutureTense 
} from '~/pages/Grammar';

import Films from '~/pages/Films';

const publicRoutes = [
    
];

const privateRoutes = [
    { path: config.routes.home, component: Home },

    { path: config.routes.alphabet, component: Alphabet },
    { path: config.routes.englishAlphabet, component: EnglishAlphabet },
    { path: config.routes.japaneseAlphabet, component: JapaneseAlphabet },
    { path: config.routes.chineseAlphabet, component: ChineseAlphabet },
    { path: config.routes.koreanAlphabet, component: KoreanAlphabet },
    { path: config.routes.frenchAlphabet, component: FrenchAlphabet },

    { path: config.routes.grammar, component: Grammar },
    { path: config.routes.englishGrammar, component: EnglishGrammar },
    { path: config.routes.englishTenses, component: EnglishTenses },
    { path: config.routes.presentTense, component: PresentTense },
    { path: config.routes.pastTense, component: PastTense },
    { path: config.routes.futureTense, component: FutureTense },          
    
    { path: config.routes.films, component: Films },
];

export { publicRoutes, privateRoutes };
