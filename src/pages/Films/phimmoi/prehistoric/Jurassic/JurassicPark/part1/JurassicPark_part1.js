import FilmInfo from '~/layouts/components/FilmInfo/FilmInfo';

import JurassicParkJson from '../JurassicPark.json';
import part1Json from './part1.json';

function JurassicPark_part1() {
    return (
        <div>
            <FilmInfo filmJson={JurassicParkJson} partJson={part1Json} />
        </div>
    );
}

export default JurassicPark_part1;