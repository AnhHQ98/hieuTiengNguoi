import { useState, useEffect } from 'react';
import wordClass from '~/pages/Vocabulary/wordClass';
import classNames from 'classnames/bind';
import styles from './FilmInfo.module.scss';

const cx = classNames.bind(styles);
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const normalize = (str) =>
    str
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .toLowerCase();

function FilmInfo({ film_json, part_json, scenes_json, frames }) {
    const [selectedSceneIndex, setSelectedSceneIndex] = useState(null);
    const [engSubInputValues, setEngSubInputValues] = useState({});

    useEffect(() => {
        const savedScene = localStorage.getItem('currentScene');
        const savedScroll = localStorage.getItem('scrollY');
        if (savedScene !== null) setSelectedSceneIndex(Number(savedScene));
        setTimeout(() => {
            if (savedScroll !== null) window.scrollTo({ top: Number(savedScroll), behavior: 'smooth' });
            const shotIndex = Number(localStorage.getItem('currentShotIndex'));
            if (!isNaN(shotIndex)) {
                const el = document.getElementById(`shot_${selectedSceneIndex}_${shotIndex}`);
                el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 300);
    }, []);

    useEffect(() => {
        const handleScroll = () => localStorage.setItem('scrollY', window.scrollY.toString());
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSceneClick = (index) => {
        setSelectedSceneIndex(index);
        localStorage.setItem('currentScene', index);
        localStorage.setItem('scrollY', window.scrollY.toString());
    };

    return (
        <div className={cx('filmWrapper')}>
            <div className={cx('filmInfomation')}>
                <h3>
                    {film_json.englishName} {part_json.part}: {part_json.englishPartTitle}
                </h3>
                <h4>Director: {film_json.director}</h4>
                <p>Year: {part_json.year}</p>
                <p>Country: {film_json.country}</p>
                <p>Duration: {part_json.duration}</p>
            </div>

            <ol className={cx('sceneList')}>
                {scenes_json.map((_, index) => (
                    <li key={index} onClick={() => handleSceneClick(index)}>
                        Scene {index + 1}
                    </li>
                ))}
            </ol>

            {selectedSceneIndex !== null && (
                <div className={cx('sceneContent')}>
                    <span>Place: </span>
                    <br />
                    {scenes_json[selectedSceneIndex].map((shot, index) => {
                        const frameIndex = shot.frameIndex ?? index;
                        const frameUrl = frames[selectedSceneIndex]?.[frameIndex];

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
                                        {(() => {
                                            const engSub = shot.subtitle.engSub;
                                            const vietSub = shot.subtitle.vietSub;

                                            const cleanedEngSub = engSub.replace(/[.,!?]/g, '').toLowerCase();
                                            const matchedWords = wordClass.filter((word) => {
                                                const eng = word.englishWord.toLowerCase();
                                                return cleanedEngSub.includes(eng);
                                            });

                                            if (matchedWords.length === 0) {
                                                return (
                                                    <>
                                                        <div className={cx('vietSub')}>
                                                            <span>{vietSub}</span>
                                                        </div>
                                                        <div className={cx('engSub')}>
                                                            <input
                                                                type="text"
                                                                placeholder={engSub}
                                                                className={cx('engSub')}
                                                            />
                                                        </div>
                                                    </>
                                                );
                                            }

                                            const allMeanings = matchedWords
                                                .flatMap((w) =>
                                                    Array.isArray(w.vietnameseMeaning)
                                                        ? w.vietnameseMeaning
                                                        : [w.vietnameseMeaning],
                                                )
                                                .sort((a, b) => b.length - a.length);

                                            const regexViet = new RegExp(
                                                `(${allMeanings
                                                    .map((m) => m.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&'))
                                                    .join('|')})`,
                                                'gi',
                                            );
                                            const vietParts = vietSub.split(regexViet);

                                            const regexEng = new RegExp(
                                                `\\b(${matchedWords.map((w) => w.englishWord).join('|')})\\b`,
                                                'gi',
                                            );
                                            const engParts = engSub.split(regexEng);

                                            return (
                                                <>
                                                    <div className={cx('vietSub')}>
                                                        {vietParts.map((part, i) => {
                                                            const cleanedPart = part.replace(/[.,!?]/g, '');
                                                            const isMatched = allMeanings.some(
                                                                (m) => normalize(m) === normalize(cleanedPart),
                                                            );
                                                            const inputId = `input_${selectedSceneIndex}_${index}_${i}`;

                                                            return isMatched ? (
                                                                <label
                                                                    key={i}
                                                                    className={cx('vietSubMeaning')}
                                                                    htmlFor={inputId}
                                                                >
                                                                    {part}
                                                                </label>
                                                            ) : (
                                                                <span key={i}>{part}</span>
                                                            );
                                                        })}
                                                    </div>

                                                    <div className={cx('engSub')}>
                                                        {engParts.map((part, i) => {
                                                            const isMatched = matchedWords.some(
                                                                (w) =>
                                                                    w.englishWord === part ||
                                                                    capitalize(w.englishWord) === part,
                                                            );
                                                            const inputId = `input_${selectedSceneIndex}_${index}_${i}`;

                                                            return isMatched ? (
                                                                <input
                                                                    key={i}
                                                                    id={inputId}
                                                                    className={cx('engSubInput', {
                                                                        correct:
                                                                            engSubInputValues[inputId]?.trim() ===
                                                                            part.trim(),
                                                                    })}
                                                                    type="text"
                                                                    placeholder={part}
                                                                    autoComplete="off"
                                                                    value={engSubInputValues[inputId] || ''}
                                                                    onChange={(e) =>
                                                                        setEngSubInputValues((prev) => ({
                                                                            ...prev,
                                                                            [inputId]: e.target.value,
                                                                        }))
                                                                    }
                                                                    size={part.length}
                                                                />
                                                            ) : (
                                                                <span key={i}>{part}</span>
                                                            );
                                                        })}
                                                    </div>
                                                </>
                                            );
                                        })()}
                                    </div>
                                </div>
                                <br />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default FilmInfo;
