import FilmScene from './FilmScene';

import classNames from 'classnames/bind';
import styles from './FilmInfo.module.scss';
const cx = classNames.bind(styles);

function FilmInfo({ film_json, part_json, scenes_json, frames }) {
    if (!film_json || !part_json) return <div>Loading film info...</div>;

    return (
        <div className={cx('filmWrapper')}>
            <div className={cx('filmInfomation')}>
                <h3>{film_json.englishName} {part_json.part}: {part_json.englishPartTitle}</h3>
                <h4>Director: {film_json.director}</h4>
                <p>Year: {part_json.year}</p>
                <p>Country: {film_json.country}</p>
                <p>Duration: {part_json.duration}</p>
            </div>
            <FilmScene scenes_json={scenes_json} frames={frames} />
        </div>
    );
}

export default FilmInfo;
