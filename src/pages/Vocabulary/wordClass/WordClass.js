import personalPronoun from './pronoun/personalPronoun';

import opinionAdjective from './adjective/descriptive/opinion';

import regularVerb from './verb/ordinary/regular';

import multiFunctionWord from './multiFunction';

const wordClass = [
    ...personalPronoun,
    ...regularVerb,
    ...opinionAdjective,
    ...multiFunctionWord
]
    
export default wordClass;
