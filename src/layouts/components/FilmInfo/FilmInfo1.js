import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './FilmInfo.module.scss';
const cx = classNames.bind(styles);

function FilmInfo1({ film_json }) {
    const [selectedScene, setSelectedScene] = useState(null);

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
                    <li key={scene.scene} onClick={() => setSelectedScene(scene)}>
                        Scene {scene.scene}
                    </li>
                ))}
            </ol>
            {selectedScene && (
                <div className={cx('sceneContent')}>
                    {selectedScene.sceneContent.map((shot, shotNumber) => (
                        <div className={cx('shot')} key={shotNumber}>
                            <div className={cx('character')}>
                                <span className={cx('characterName')}>{shot.character.name}</span>
                            </div>
                            <div className={cx('subtitle')}>
                                <div className={cx('vietSub')}>
                                    <label className={cx('vietSubMeaning')}>{shot.subtitle.vietSub}</label>
                                </div>
                                <div>
                                    <input
                                        className={cx('engSubWord')}
                                        placeholder={shot.subtitle.engSub}
                                        size={shot.subtitle.engSub.length}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default FilmInfo1;
