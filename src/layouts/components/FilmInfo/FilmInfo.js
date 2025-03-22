import { useState } from 'react';

import classNames from 'classnames/bind';
import styles from './FilmInfo.module.scss';
const cx = classNames.bind(styles);

function FilmInfo({ filmJson, partJson, scenesJson }) {
    const [selectedSceneIndex, setSelectedSceneIndex] = useState(null);

    return (
        <div>
            <div className={cx('filmInfomation')}>
                <h3>
                    {filmJson.englishName} {partJson.part}
                </h3>
                <h4>Director: {filmJson.director}</h4>
                <p>Year: {partJson.year}</p>
                <p>Country: {filmJson.country}</p>
                <p>Duration: {partJson.duration}</p>
            </div>
            <ul className={cx('scenes')}>
                {scenesJson.map((_, index) => (
                    <li key={index} onClick={() => setSelectedSceneIndex(index)}>
                        Scene {index + 1}
                    </li>
                ))}
            </ul>
            <div className={cx('sceneContent')}>
                {selectedSceneIndex !== null && (
                    <div>
                        <h4>Character: {scenesJson[selectedSceneIndex].character}</h4>
                        <p>Frame: {scenesJson[selectedSceneIndex].frame}</p>
                        <p>English Sub: {scenesJson[selectedSceneIndex].engSub}</p>
                        <p>Vietnamese Sub: {scenesJson[selectedSceneIndex].vietSub}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FilmInfo;
