import { normalizeEnglishWord } from './normalizeEnglishWord';
import { getVietnameseMeaning } from './getVietnameseMeaning';

export const extractMappedVietnameseWords = (engSubWords, wordClass, shot) => {
    const vietSubWords = [];
    const vietsubToEngsubMap = {};
    engSubWords.forEach((engSubWord, i) => {
        const previousChar1 = engSubWords[i - 1] || null;
        const previousChar2 = engSubWords[i - 2] || null;
        const englishWord = normalizeEnglishWord(engSubWord, previousChar1, previousChar2, i);
        const vietnameseMeanings = getVietnameseMeaning(englishWord, wordClass);
        
        vietnameseMeanings.forEach((vietnameseMeaning) => {
            console.log('extractMap - vietnameseMeaning: ', vietnameseMeaning);
            let vietnameseWord;
            if (shot.subtitle.vietSub.includes(vietnameseMeaning)) {
                vietnameseWord = vietnameseMeaning;
            } else if (
                shot.subtitle.vietSub.includes(vietnameseMeaning.charAt(0).toUpperCase() + vietnameseMeaning.slice(1))
            ) {
                vietnameseWord = vietnameseMeaning.charAt(0).toUpperCase() + vietnameseMeaning.slice(1);
            }
            console.log('extractMap - vietnameseWord', vietnameseWord);
            
            vietSubWords.push(vietnameseWord);
            vietsubToEngsubMap[vietnameseWord] = englishWord;
        });
    });
    return { vietSubWords, vietsubToEngsubMap };
};