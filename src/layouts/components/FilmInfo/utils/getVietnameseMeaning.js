export const getVietnameseMeaning = (englishWord, wordClass) => {
    let vietnameseMeanings = [];

    if (wordClass[englishWord] && wordClass[englishWord].vietnameseMeaning) {
        if (Array.isArray(wordClass[englishWord].vietnameseMeaning)) {
            vietnameseMeanings.push(...wordClass[englishWord].vietnameseMeaning);
        } else {
            for (const type in wordClass[englishWord].vietnameseMeaning) {
                if (Array.isArray(wordClass[englishWord].vietnameseMeaning[type])) {
                    vietnameseMeanings.push(...wordClass[englishWord].vietnameseMeaning[type]);
                } else if (wordClass[englishWord].vietnameseMeaning[type].meaning) {
                    vietnameseMeanings.push(...wordClass[englishWord].vietnameseMeaning[type].meaning);
                }
            }
        }
        return vietnameseMeanings;
    }

    for (const key in wordClass) {
        if (wordClass[key].vietnameseMeaning) {
            for (const type in wordClass[key].vietnameseMeaning) {
                if (type === 'verb' && wordClass[key].vietnameseMeaning[type].tenses) {
                    const tenses = wordClass[key].vietnameseMeaning[type].tenses;
                    for (const tense in tenses) {
                        if (tenses[tense] && tenses[tense].word && tenses[tense].word === englishWord) {
                            console.log("type === 'verb'", tenses[tense].meaning); //
                            vietnameseMeanings.push(...tenses[tense].meaning);
                            console.log("type === 'verb', vietnameseMeanings: ", vietnameseMeanings); 
                            return vietnameseMeanings;
                        }
                    }
                }
                
                if (type === 'noun' && wordClass[key].vietnameseMeaning[type].plural) {
                    if (wordClass[key].vietnameseMeaning[type].plural.word === englishWord) {
                        vietnameseMeanings.push(...wordClass[key].vietnameseMeaning[type].plural.meaning);
                        return vietnameseMeanings;
                    }
                }
            }
        }
    }
    
    return vietnameseMeanings;
};
