export const getVietnameseMeaning = (englishWord, wordClass) => {
    let vietnameseMeanings = [];
    if (wordClass?.[englishWord]) {
        if (
            wordClass[englishWord].plural &&
            englishWord === wordClass[englishWord].plural &&
            wordClass[englishWord].vietnameseMeaningPlural
        ) {
            for (let type in wordClass[englishWord].vietnameseMeaningPlural) {
                vietnameseMeanings = vietnameseMeanings.concat(wordClass[englishWord].vietnameseMeaningPlural[type]);
            }
        } else if (wordClass[englishWord].vietnameseMeaning) {
            for (let type in wordClass[englishWord].vietnameseMeaning) {
                vietnameseMeanings = vietnameseMeanings.concat(wordClass[englishWord].vietnameseMeaning[type]);
            }
        }
    } else {
        for (const key in wordClass) {
            if (wordClass[key].plural === englishWord && wordClass[key].vietnameseMeaningPlural) {
                for (let type in wordClass[key].vietnameseMeaningPlural) {
                    vietnameseMeanings = vietnameseMeanings.concat(wordClass[key].vietnameseMeaningPlural[type]);
                }
                break;
            }
        }
    }
    return vietnameseMeanings;
}