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
    PresentSimple,
    PresentContinuous,
    PresentPerfect,
    PresentPerfectContinuous,
    PastTense,
    PastSimple,
    PastPerfect,
    PastContinuous,
    PastPerfectContinuous,
    FutureTense,
    FutureSimple,
    FutureContinuous,
    FuturePerfect,
    FuturePerfectContinuous,
    SentenceStructure
} from '~/pages/Grammar';

import {
    Films,
    Phimmoi,
    Prehistoric,
    Jurassic,
    JurassicWorld,
    JurassicPark,
} from '~/pages/Films';

const publicRoutes = [
    
];

const privateRoutes = [
    { path: config.routes.home, component: Home },

    // alphabet
    { path: config.routes.alphabet, component: Alphabet },
    { path: config.routes.englishAlphabet, component: EnglishAlphabet },
    { path: config.routes.japaneseAlphabet, component: JapaneseAlphabet },
    { path: config.routes.chineseAlphabet, component: ChineseAlphabet },
    { path: config.routes.koreanAlphabet, component: KoreanAlphabet },
    { path: config.routes.frenchAlphabet, component: FrenchAlphabet },

    // grammar
    { path: config.routes.grammar, component: Grammar },

    { path: config.routes.englishGrammar, component: EnglishGrammar },

    { path: config.routes.englishTenses, component: EnglishTenses },

    { path: config.routes.presentTense, component: PresentTense },
    { path: config.routes.presentSimple, component: PresentSimple },
    { path: config.routes.presentContinuous, component: PresentContinuous },
    { path: config.routes.presentPerfect, component: PresentPerfect },
    { path: config.routes.presentPerfectContinuous, component: PresentPerfectContinuous },

    { path: config.routes.pastTense, component: PastTense },
    { path: config.routes.pastSimple, component: PastSimple },
    { path: config.routes.pastContinuous, component: PastContinuous },
    { path: config.routes.pastPerfect, component: PastPerfect },
    { path: config.routes.pastPerfectContinuous, component: PastPerfectContinuous },

    { path: config.routes.futureTense, component: FutureTense },
    { path: config.routes.futureSimple, component: FutureSimple },
    { path: config.routes.futureContinuous, component: FutureContinuous },
    { path: config.routes.futurePerfect, component: FuturePerfect },
    { path: config.routes.futurePerfectContinuous, component: FuturePerfectContinuous },

    { path: config.routes.sentenceStructure, component: SentenceStructure },

    // films
    { path: config.routes.films, component: Films },
    // phimmoi
    { path: config.routes.phimmoi, component: Phimmoi },

    { path: config.routes.prehistoric, component: Prehistoric },

    { path: config.routes.jurassic, component: Jurassic },

    { path: config.routes.jurassicWorld, component: JurassicWorld },

    { path: config.routes.jurassicPark, component: JurassicPark },
    // actors
];

export { publicRoutes, privateRoutes };
