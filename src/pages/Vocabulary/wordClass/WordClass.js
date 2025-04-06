import personalPronoun from './pronoun/personalPronoun';

import regularVerb from './verb/ordinary/regular';
import linkingVerb from './verb/ordinary/linking';

import opinionAdjective from './adjective/descriptive/opinion';

import multiFunctionWord from './multiFunction';

const wordClass = [
    ...personalPronoun,
    ...regularVerb,
    ...linkingVerb,
    ...opinionAdjective,
    ...multiFunctionWord
]
    
export default wordClass;
