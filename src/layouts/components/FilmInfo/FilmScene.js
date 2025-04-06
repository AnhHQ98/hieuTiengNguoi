// “Dữ liệu là linh hồn, code chỉ là công cụ dẫn dắt” 😎
import { useState, useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from './FilmScene.module.scss';
const cx = classNames.bind(styles);

const normalizeLower = (str) => str.toLocaleLowerCase();

const getMatchedWord = (lowerWord, wordList) => {
    return wordList.find((wordObj) => {
        const goc = wordObj.englishWord?.toLowerCase();
        if (goc === lowerWord) return true;

        const conjs = Object.values(wordObj.conjugations || {}).flat();
        return conjs.some((c) => c.toLowerCase() === lowerWord);
    });
};

function FilmScene({ scenes_json, frames }) {
    const [selectedSceneIndex, setSelectedSceneIndex] = useState(null);
    const [engSubInputValues, setEngSubInputValues] = useState({});
    const [wordClass, setWordClass] = useState([]);

    useEffect(() => {
        const savedScene = localStorage.getItem('currentScene');
        if (savedScene !== null) {
            setSelectedSceneIndex(Number(savedScene));
        }
    }, []);

    useEffect(() => {
        if (selectedSceneIndex === null) return;
        const savedScroll = localStorage.getItem('scrollY');
        const shotIndex = Number(localStorage.getItem('currentShotIndex'));
        requestAnimationFrame(() => {
            setTimeout(() => {
                if (!isNaN(shotIndex)) {
                    const el = document.getElementById(`shot_${selectedSceneIndex}_${shotIndex}`);
                    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else if (savedScroll !== null) {
                    window.scrollTo({ top: Number(savedScroll), behavior: 'smooth' });
                }
            }, 50);
        });
    }, [selectedSceneIndex]);

    useEffect(() => {
        const handleScroll = () => {
            localStorage.setItem('scrollY', window.scrollY.toString());
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSceneClick = (index) => {
        setSelectedSceneIndex(index);
        localStorage.setItem('currentScene', index);
        localStorage.setItem('scrollY', window.scrollY.toString());
    };

    useEffect(() => {
        Promise.all([
            fetch('/json/english/vocabulary/wordClass/pronoun/personalPronoun.json')
                .then((res) => {
                    if (!res.ok) throw new Error('Failed to load personalPronoun.json');
                    return res.json();
                }).catch((err) => {
                    console.error(err.message);
                    return [];
                }),

            fetch('/json/english/vocabulary/wordClass/verb/regularVerb.json')
                .then((res) => {
                    if (!res.ok) throw new Error('Failed to load regularVerb.json');
                    return res.json();
                }).catch((err) => {
                    console.error(err.message);
                    return [];
                }),

            fetch('/json/english/vocabulary/wordClass/verb/linkingVerb.json')
                .then((res) => {
                    if (!res.ok) throw new Error('Failed to load linkingVerb.json');
                    return res.json();
                }).catch((err) => {
                    console.error(err.message);
                    return [];
                }),

            fetch('/json/english/vocabulary/wordClass/adjective/opinionAdjective.json')
                .then((res) => {
                    if (!res.ok) throw new Error('Failed to load opinionAdjective.json');
                    return res.json();
                }).catch((err) => {
                    console.error(err.message);
                    return [];
                }),

            fetch('/json/english/vocabulary/wordClass/multiFunctionWord.json')
                .then((res) => {
                    if (!res.ok) throw new Error('Failed to load multiFunctionWord.json');
                    return res.json();
                }).catch((err) => {
                    console.error(err.message);
                    return [];
                }),
        ])
            .then((wordLists) => {
                const merged = wordLists.flat();
                console.log('✅ Đã nạp wordClass:', merged);
                setWordClass(merged);
            })
            .catch((err) => {
                console.error('❌ Lỗi không mong muốn khi load wordClass:', err);
            });
    }, []);


    if (!wordClass.length) return <div>Loading wordClass...</div>;

    if (selectedSceneIndex === null) {
        return (
            <ol className={cx('sceneList')}>
                {scenes_json.map((_, index) => (
                    <li key={index} onClick={() => handleSceneClick(index)}>
                        Scene {index + 1}
                    </li>
                ))}
            </ol>
        );
    }

    const scene = scenes_json[selectedSceneIndex];

    return (
        <div>
            <ol className={cx('sceneList')}>
                {scenes_json.map((_, index) => (
                    <li
                        key={index}
                        className={index === selectedSceneIndex ? cx('active') : ''}
                        onClick={() => handleSceneClick(index)}
                    >
                        Scene {index + 1}
                    </li>
                ))}
            </ol>

            <div className={cx('sceneContent')}>
                {scene.map((shot, index) => {
                    const frameIndex = shot.frameIndex ?? index;
                    const frameUrl = frames?.[selectedSceneIndex]?.[frameIndex];
                    const engSub = shot.subtitle.engSub;
                    const vietSub = shot.subtitle.vietSub;

                    const cleanedEngSub = engSub.replace(/[.,!?]/g, '').toLowerCase();
                    const matchedWords = wordClass.filter((word) => {
                        const goc = word.englishWord?.toLowerCase();
                        if (cleanedEngSub.includes(goc)) return true;
                        const conjs = Object.values(word.conjugations || {})
                            .flat()
                            .map((c) => c.toLowerCase());
                        return conjs.some((c) => cleanedEngSub.includes(c));
                    });

                    const allMeanings = matchedWords
                        .flatMap((w) =>
                            Array.isArray(w.vietnameseMeaning) ? w.vietnameseMeaning : [w.vietnameseMeaning],
                        )
                        .sort((a, b) => b.length - a.length);

                    const regexViet = new RegExp(
                        `(${allMeanings.map((m) => m.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')).join('|')})`,
                        'gi',
                    );

                    const vietParts = [];
                    let lastIndex = 0;
                    for (const match of vietSub.matchAll(regexViet)) {
                        const start = match.index;
                        const end = start + match[0].length;
                        if (start > lastIndex) vietParts.push(vietSub.slice(lastIndex, start));
                        vietParts.push(match[0]);
                        lastIndex = end;
                    }
                    if (lastIndex < vietSub.length) vietParts.push(vietSub.slice(lastIndex));

                    const regexEng = /\s+|\w+|[.,!?]/g;
                    const engPartsRaw = engSub.match(regexEng) || [];


                    let matchedInputCounter = 0;
                    const engParts = engPartsRaw.map((part) => {
                        const lower = part.toLowerCase();
                        const matchedWord = getMatchedWord(lower, matchedWords);
                        const isMatched = !!matchedWord;

                        const inputId = isMatched
                            ? `shot${index + 1}[${matchedInputCounter++}]_scene${selectedSceneIndex + 1}`
                            : null;

                        return {
                            word: part,
                            matched: isMatched,
                            matchedWord,
                            inputId,
                        };
                    });

                    return (
                        <div
                            className={cx('shot')}
                            key={index}
                            id={`shot_${selectedSceneIndex}_${index}`}
                            style={{ backgroundImage: `url(${frameUrl})` }}
                        >
                            <div className={cx('shotContent')}>
                                <div className={cx('character')}>
                                    <div className={cx('face')}></div>
                                    <span className={cx('name')}>{shot.character.name}</span>
                                </div>
                                <div className={cx('subtitle')}>
                                    <div className={cx('vietSub')}>
                                        {vietParts.map((part, i) => {
                                            const cleanedPart = part.trim().replace(/[.,!?]/g, '');
                                            const normalizedPart = normalizeLower(cleanedPart);

                                            const matchedWord = matchedWords.find((w) => {
                                                const meanings = Array.isArray(w.vietnameseMeaning)
                                                    ? w.vietnameseMeaning
                                                    : [w.vietnameseMeaning];
                                                return meanings.some((m) => normalizeLower(m) === normalizedPart);
                                            });

                                            const engPartMatch = engParts.find((ep) => ep.matchedWord === matchedWord);
                                            const inputId = engPartMatch?.inputId ?? null;

                                            if (matchedWord && inputId) {
                                                return (
                                                    <label key={i} className={cx('vietSubMeaning')} htmlFor={inputId}>
                                                        {part}
                                                    </label>
                                                );
                                            } else {
                                                return <span key={i}>{part}</span>;
                                            }
                                        })}
                                    </div>

                                    <div className={cx('engSub')}>
                                        {engParts.map((partObj, i) => {
                                            const { word, matched, matchedWord, inputId } = partObj;

                                            if (matched && matchedWord) {
                                                return (
                                                    <input
                                                        key={i}
                                                        id={inputId}
                                                        className={cx('engSubInput', {
                                                            correct: engSubInputValues[inputId]?.trim() === word.trim(),
                                                        })}
                                                        type="text"
                                                        placeholder={word}
                                                        autoComplete="off"
                                                        value={engSubInputValues[inputId] || ''}
                                                        onChange={(e) => {
                                                            localStorage.setItem('currentShotIndex', index.toString());
                                                            setEngSubInputValues((prev) => ({
                                                                ...prev,
                                                                [inputId]: e.target.value,
                                                            }));
                                                        }}
                                                        size={word.length}
                                                    />
                                                );
                                            }

                                            return <span key={i}>{word}</span>;
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default FilmScene;
