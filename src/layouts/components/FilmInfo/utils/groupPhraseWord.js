export const groupPhraseWord = (engSubWords, engSubText, wordClass) => {
    if (!wordClass) return engSubWords;
    Object.entries(wordClass)
        .filter(([_, val]) => val.subtype === 'phrase')
        .forEach(([phrase]) => {
            const parts = phrase.split(' ');
            const lengthWithSpaces = parts.length * 2 - 1;
            const capitalized = phrase.charAt(0).toUpperCase() + phrase.slice(1);
            if (engSubText.includes(phrase) || engSubText.includes(capitalized)) {
                for (let i = 0; i <= engSubWords.length - lengthWithSpaces; i++) {
                    const segment = engSubWords.slice(i, i + lengthWithSpaces).join('');
                    if (segment === phrase || segment === capitalized) {
                        engSubWords.splice(i, lengthWithSpaces, phrase);
                    }
                }
            }
        });

    return engSubWords;
};
