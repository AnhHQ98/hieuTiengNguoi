import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './FilmInfo.module.scss';
const cx = classNames.bind(styles);

function FilmInfo1({ film_json, sceneContent, onSceneClick }) {
    const [wordClass, setWordClass] = useState();
    useEffect(() => {
        fetch('http://localhost:1025/wordclass')
            .then((res) => res.json())
            .then((data) => setWordClass(data))
            .catch((err) => console.error('❌ Lỗi fetch wordClass từ backend:', err));
    }, []);
    const normalizeEnglishWord = (engSubWord, previousChar, i) => {
        const isFirstChar = i === 0;
        const isAlphanumericChar = /^[a-zA-Z0-9]+$/.test(engSubWord);
        const isAfterSentenceEnd = ['.', '...', '!', '?'].includes(previousChar);
        return isAlphanumericChar && (isFirstChar || isAfterSentenceEnd) ? engSubWord.toLowerCase() : engSubWord;
    };
    return (
        <div className={cx('filmWrapper')}>
            <div className={cx('filmInfomation')}>
                <h3>
                    {film_json.englishName} {film_json.part}
                </h3>
                <h4>Director: {film_json.director}</h4>
                <p>Year: {film_json.year}</p>
                <p>Duration: {film_json.duration} minutes</p>
            </div>
            <ol className={cx('sceneList')}>
                {film_json.sceneList.map((scene) => (
                    <li key={scene.scene} onClick={() => onSceneClick(scene.scene)}>
                        Scene {scene.scene}
                    </li>
                ))}
            </ol>
            {Array.isArray(sceneContent) && sceneContent.length > 0 && (
                <div className={cx('sceneContent')}>
                    {sceneContent.map((shot, shotNumber) => {
                        let engSubWords = shot.subtitle.engSub.match(/[a-zA-Z0-9]+|[.,!?…]+|\s+/g);
                        Object.entries(wordClass)
                            .filter(([key, val]) => val.subtype === 'phrase')
                            .forEach(([phrase]) => {
                                const phraseParts = phrase.split(' ');
                                const phraseLengthIncludeSpace = phraseParts.length * 2 - 1;
                                if (shot.subtitle.engSub.includes(phrase)) {
                                    console.log('phraseLengthIncludeSpace: ', phraseLengthIncludeSpace);
                                    for (let i = 0; i <= engSubWords.length - phraseLengthIncludeSpace; i++) {
                                        const phraseSegment = engSubWords.slice(i, i + phraseLengthIncludeSpace).join('');
                                        if (phraseSegment === phrase) {
                                            engSubWords.splice(i, phraseLengthIncludeSpace, phraseSegment);
                                            // i--;
                                        }
                                        console.log('phraseSegment: ', phraseSegment);
                                    }
                                    console.log(`✅ Có cụm "${phrase}" trong câu:`, shot.subtitle.engSub);
                                    console.log('📎 engSubWords sau khi gộp phrase:', engSubWords);
                                } else {
                                    if (shot.subtitle.engSub.includes(phrase.charAt(0).toUpperCase() + phrase.slice(1))) {
                                        console.log(`🟡 Có cụm viết hoa "${phrase}" trong câu:`, shot.subtitle.engSub);
                                    }
                                }
                            });
                        return (
                            <div className={cx('shot')} key={shotNumber}>
                                <div className={cx('character')}>
                                    <span className={cx('characterName')}>{shot.character.name}</span>
                                </div>
                                <div className={cx('subtitle')}>
                                    <div className={cx('engSub')}>
                                        {engSubWords.map((engSubWord, i) => {
                                            if (/[.,!?…\s]/.test(engSubWord)) return <span key={i}>{engSubWord}</span>;
                                            const previousChar = engSubWords[i - 1] || null;
                                            const englishWord = normalizeEnglishWord(engSubWord, previousChar, i);
                                            return (
                                                <input
                                                    key={i}
                                                    id={englishWord}
                                                    className={cx('engSubWord')}
                                                    placeholder={engSubWord}
                                                    size={engSubWord.length}
                                                />
                                            );
                                        })}
                                    </div>
                                    <div className={cx('vietSub')}>
                                        {(() => {
                                            const vietSubWords = [];
                                            const vietsubToEngsubMap = {};
                                            engSubWords.forEach((engSubWord, i) => {
                                                const previousChar = engSubWords[i - 1] || null;
                                                const englishWord = normalizeEnglishWord(engSubWord, previousChar, i);
                                                if (wordClass?.hasOwnProperty(englishWord)) {
                                                    console.log('✅ Khớp wordClass:', englishWord);
                                                    wordClass[englishWord].vietnameseMeaning.forEach(
                                                        (vietnameseMeaning) => {
                                                            let vietnameseWord;
                                                            if (shot.subtitle.vietSub.includes(vietnameseMeaning)) {
                                                                vietnameseWord = vietnameseMeaning;
                                                            } else {
                                                                vietnameseWord =
                                                                    vietnameseMeaning.charAt(0).toUpperCase() +
                                                                    vietnameseMeaning.slice(1);
                                                                if (shot.subtitle.vietSub.includes(vietnameseWord)) {
                                                                    console.log(
                                                                        `🧐 "${vietnameseWord}" (viết hoa) có trong vietSub:`,
                                                                        shot.subtitle.vietSub,
                                                                    );
                                                                    vietSubWords.push(vietnameseWord);
                                                                    vietsubToEngsubMap[vietnameseWord] = englishWord;
                                                                }
                                                            }
                                                        },
                                                    );
                                                }
                                            });
                                            let vietSubSegments = [shot.subtitle.vietSub];
                                            vietSubWords.forEach((vietSubWord) => {
                                                console.log(
                                                    `🔍 Check "${vietSubWord}" có trong vietSub? 👉`,
                                                    shot.subtitle.vietSub.includes(vietSubWord),
                                                );
                                                let newVietSubSegment = [];
                                                vietSubSegments.forEach((vietSubSegment) => {
                                                    if (vietSubSegment.includes(vietSubWord)) {
                                                        const vietSubParts = vietSubSegment.split(vietSubWord);
                                                        for (let i = 0; i < vietSubParts.length; i++) {
                                                            if (vietSubParts[i].trim() !== '')
                                                                newVietSubSegment.push(vietSubParts[i]);
                                                            if (i < vietSubParts.length - 1)
                                                                newVietSubSegment.push(vietSubWord);
                                                        }
                                                    } else newVietSubSegment.push(vietSubSegment);
                                                });
                                                vietSubSegments = newVietSubSegment;
                                            });
                                            console.log('📎 Các phần sau khi tách:', vietSubSegments);
                                            return vietSubSegments.map((vietSubSegment, i) =>
                                                vietSubWords.includes(vietSubSegment) ? (
                                                    <label key={i} htmlFor={vietsubToEngsubMap[vietSubSegment]} className={cx('vietSubMeaning')}>
                                                        {vietSubSegment}
                                                    </label>
                                                ) : (
                                                    <span key={i}>{vietSubSegment}</span>
                                                ),
                                            );
                                        })()}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default FilmInfo1;
