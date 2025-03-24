import { useState } from 'react';

import classNames from 'classnames/bind';
import styles from './FilmInfo.module.scss';
const cx = classNames.bind(styles);

function FilmInfo({ film_json, part_json, scenes_json }) {
    const [selectedSceneIndex, setSelectedSceneIndex] = useState(null);

    return (
        <div>
            <div className={cx('filmInfomation')}>
                <h3>
                    {film_json.englishName} {part_json.part}
                </h3>
                <h4>Director: {film_json.director}</h4>
                <p>Year: {part_json.year}</p>
                <p>Country: {film_json.country}</p>
                <p>Duration: {part_json.duration}</p>
            </div>

            <ol className={cx('sceneList')}>
                {scenes_json.map((_, index) => (
                    <li key={index} onClick={() => setSelectedSceneIndex(index)}>
                        Scene {index + 1}
                    </li>
                ))}
            </ol>

            {selectedSceneIndex !== null && (
                <div className={cx('sceneContent')}>
                    <span>Place: </span>
                    <br />
                    {scenes_json[selectedSceneIndex].map((shot, index) => (
                        <div key={index} className={cx('shot')}>
                            {/* {frames[selectedSceneIndex] && frames[selectedSceneIndex][index] && (
                                <img src={frames[selectedSceneIndex][index]} alt={`Shot ${index + 1}`} />
                            )} */}
                            <div className={cx('shotContent')}>
                                <p>Character: {shot.character.name}</p>
                                <p>VietSub: {shot.subtitle.vietSub}</p>
                                <p>EngSub: {shot.subtitle.engSub}</p>
                            </div>
                            <br />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default FilmInfo;
