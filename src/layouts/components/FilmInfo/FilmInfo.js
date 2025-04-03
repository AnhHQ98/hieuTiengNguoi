import { useState, useEffect, useRef } from 'react';

import wordClass from '~/pages/Vocabulary/wordClass';

import classNames from 'classnames/bind';
import styles from './FilmInfo.module.scss';
const cx = classNames.bind(styles);

function FilmInfo({ film_json, part_json, scenes_json, frames }) {
    const [selectedSceneIndex, setSelectedSceneIndex] = useState(null);
    const [showEngSubIndex, setShowEngSubIndex] = useState(null);
    const shotRefs = useRef([]);

    useEffect(() => {
        const savedScene = localStorage.getItem('currentScene');
        const savedScroll = localStorage.getItem('scrollY');

        if (savedScene !== null) {
            setSelectedSceneIndex(Number(savedScene));
        }

        setTimeout(() => {
            if (savedScroll !== null) {
                window.scrollTo({ top: Number(savedScroll), behavior: 'smooth' });
            }

            const savedShot = localStorage.getItem('currentShotIndex');
            const shotIndex = Number(savedShot);
            if (!isNaN(shotIndex) && shotRefs.current[shotIndex]) {
                shotRefs.current[shotIndex].scrollIntoView({behavior: 'smooth', block: 'center'});
            }
        }, 300);
    }, [])

    const handleSceneClick = (index) => {
        setSelectedSceneIndex(index);
        localStorage.setItem('currentScene', index);
        localStorage.setItem('scrollY', window.scrollY.toString());
    }

    const handleVietSubClick = (index) => {
        setShowEngSubIndex(index);
        localStorage.setItem('currentShotIndex', index);
        localStorage.setItem('scrollY', window.scrollY.toString());
    }

    useEffect(() => {
        const handleScroll = () => {
            localStorage.setItem('scrollY', window.scrollY.toString());
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
                        // Dùng filter để lấy tất cả từ khớp
                        const matchedWords = wordClass.filter((word) =>
                            shot.subtitle.vietSub.includes(word.vietnameseMeaning),
                        );
                        return (
                            <div
                                className={cx('shot')}
                                key={index}
                                ref={(el) => (shotRefs.current[index] = el)}
                                style={{ backgroundImage: `url(${frameUrl})` }}
                            >
                                <div className={cx('shotContent')}>
                                    <div className={cx('character')}>
                                        <div className={cx('face')}></div>
                                        <span className={cx('name')}>{shot.character.name}</span>
                                    </div>
                                    <div className={cx('subtitle')}>
                                        <div className={cx('vietSub')}>
                                            {(() => {
                                                const vietSub = shot.subtitle.vietSub;
                                                const match = wordClass.find((word) =>
                                                    vietSub.includes(word.vietnameseMeaning),
                                                );

                                                if (match) {
                                                    const parts = vietSub.split(match.vietnameseMeaning);

                                                    return (
                                                        <>
                                                            {parts[0] && <span>{parts[0]}</span>}
                                                            <label
                                                                className={cx('vietSubMeaning')}
                                                                htmlFor={`shot${index}_scene${selectedSceneIndex}_${film_json.englishName.replace(/\s+/g,'')}${part_json.part}`}
                                                            >
                                                                {match.vietnameseMeaning}
                                                            </label>
                                                            {parts[1] && <span>{parts[1]}</span>}
                                                        </>
                                                    );
                                                } else {
                                                    return <span>{vietSub}</span>;
                                                }
                                            })()}
                                        </div>
                                        <div className={cx('engSub')}>
                                            {(() => {
                                                const engSub = shot.subtitle.engSub;
                                                const match = wordClass.find((word) =>
                                                    engSub.includes(word.englishMeaning),
                                                );

                                                if (match) {
                                                    const parts = engSub.split(match.englishMeaning);
                                                    return (
                                                        <>
                                                            {parts[0] && <span>{parts[0]}</span>}
                                                            <input
                                                                id={`shot${index}_scene${selectedSceneIndex}_${film_json.englishName.replace(/\s+/g,'')}${part_json.part}`}
                                                                className={cx('engSub')}
                                                                type="text"
                                                                placeholder={match.englishMeaning}
                                                            />
                                                            {parts[1] && <span>{parts[1]}</span>}
                                                        </>
                                                    );
                                                } else {
                                                    return (
                                                        <input
                                                            type="text"
                                                            placeholder={engSub}
                                                            className={cx('engSub')}
                                                        />
                                                    );
                                                }
                                            })()}
                                        </div>
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
