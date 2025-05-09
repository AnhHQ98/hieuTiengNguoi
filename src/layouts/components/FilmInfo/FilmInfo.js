import { useState, useEffect, useRef } from 'react';
import { normalizeEnglishWord } from './utils/normalizeEnglishWord';
import { groupPhraseWord } from './utils/groupPhraseWord';
import { generateVietSubSegment } from './utils/generateVietSubSegment';
import { extractMappedVietnameseWords } from './utils/extractMappedVietnameseWord';
import classNames from 'classnames/bind';
import styles from './FilmInfo.module.scss';
const cx = classNames.bind(styles);

function FilmInfo({ film_json, sceneContent, onSceneClick }) {
    const [wordClass, setWordClass] = useState();

    useEffect(() => {
        fetch('http://localhost:1025/wordclass')
            .then((res) => res.json())
            .then((data) => setWordClass(data))
            .catch((err) => console.error('❌ Lỗi fetch wordClass từ backend:', err));
    }, []);
    const englishWordCount = {};
    const vietnameseWordCount = {};
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
                        console.log('engSubWords -------', engSubWords);
                        engSubWords = groupPhraseWord(engSubWords, shot.subtitle.engSub, wordClass);
                        return (
                            <div className={cx('shot')} key={shotNumber}>
                                <div className={cx('character')}>
                                    <span className={cx('characterName')}>{shot.character.name}</span>
                                </div>
                                <div className={cx('subtitle')}>
                                    <div className={cx('engSub')}>
                                        {engSubWords.map((engSubWord, i) => {
                                            const previousChar1 = engSubWords[i - 1] || null;
                                            const previousChar2 = engSubWords[i - 2] || null;
                                            const englishWord = normalizeEnglishWord(
                                                engSubWord,
                                                previousChar1,
                                                previousChar2,
                                                i,
                                            );
                                            if (/^[.,!?…\s]+$/.test(engSubWord))
                                                return <span key={i}>{engSubWord}</span>;
                                            console.log('englishWord   -   -', englishWord);

                                            if (!englishWordCount[englishWord]) englishWordCount[englishWord] = 1;
                                            else englishWordCount[englishWord]++;
                                            return (
                                                <input
                                                    key={i}
                                                    id={
                                                        englishWord.replace(/\s+/g, '-') +
                                                        '-' +
                                                        englishWordCount[englishWord]
                                                    }
                                                    className={cx('engSubWord')}
                                                    placeholder={engSubWord}
                                                    size={engSubWord.length}
                                                />
                                            );
                                        })}
                                    </div>
                                    <div className={cx('vietSub')}>
                                        {(() => {
                                            const { vietSubWords, vietsubToEngsubMap } = extractMappedVietnameseWords(
                                                engSubWords,
                                                wordClass,
                                                shot,
                                            );
                                            let vietSubSegments = generateVietSubSegment(shot, vietSubWords);
                                            console.log('📎 Các phần sau khi tách:', vietSubSegments);
                                            return vietSubSegments.map((vietSubSegment, i) =>
                                                vietSubWords.includes(vietSubSegment) ? (
                                                    (() => {
                                                        if (!vietnameseWordCount[vietsubToEngsubMap[vietSubSegment]]) {
                                                            vietnameseWordCount[vietsubToEngsubMap[vietSubSegment]] = 1;
                                                        } else {
                                                            vietnameseWordCount[vietsubToEngsubMap[vietSubSegment]]++;
                                                        }
                                                        return (
                                                            <>
                                                                <label
                                                                    key={i}
                                                                    htmlFor={
                                                                        vietsubToEngsubMap[vietSubSegment].replace(
                                                                            /\s+/g,
                                                                            '-',
                                                                        ) +
                                                                        '-' +
                                                                        vietnameseWordCount[
                                                                            vietsubToEngsubMap[vietSubSegment]
                                                                        ]
                                                                    }
                                                                    className={cx('vietSubMeaning')}
                                                                >
                                                                    {vietSubSegment}
                                                                </label>
                                                                {vietSubWords.includes(vietSubSegments[i + 1])
                                                                    ? ' '
                                                                    : null}
                                                            </>
                                                        );
                                                    })()
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

export default FilmInfo;