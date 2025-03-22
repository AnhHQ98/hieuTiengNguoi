import FilmInfo from '~/layouts/components/FilmInfo';

import JurassicParkJson from '../JurassicPark.json';

import part1Json from './JurassicPark1.json';
import scene1Json from './scene1_JurassicPark1.json';
import scene2Json from './scene2_JurassicPark1.json';
import scene3Json from './scene3_JurassicPark1.json';

const scenesJson = [scene1Json, scene2Json, scene3Json];

function JurassicPark1() {
    return (
        <FilmInfo
            filmJson={JurassicParkJson}
            partJson={part1Json}
            scenesJson={scenesJson}
        />
    )
}

export default JurassicPark1;
