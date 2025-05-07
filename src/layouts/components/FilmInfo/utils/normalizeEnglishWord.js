export const normalizeEnglishWord = (engSubWord, previousChar1, previousChar2, i) => {
    const isFirstChar = i === 0;
    const isAlphanumericChar = /^[a-zA-Z0-9\s]+$/.test(engSubWord);
    const isAfterSentenceEnd =
        ['.', '...', '!', '?'].includes(previousChar1) ||
        (previousChar1 && previousChar1.trim() === '' &&
            ['.', '...', '!', '?'].includes(previousChar2)
        );
    if (engSubWord === 'I' || /^I'/.test(engSubWord)) return engSubWord;
    return isAlphanumericChar &&
        (isFirstChar || isAfterSentenceEnd) ? engSubWord.toLowerCase() : engSubWord;
};