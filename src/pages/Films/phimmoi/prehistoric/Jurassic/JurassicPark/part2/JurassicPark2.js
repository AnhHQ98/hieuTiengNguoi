import FilmInfo from '~/layouts/components/FilmInfo';

import {
    JurassicPark_json,
    JurassicPark2_json,
    scene1_JurassicPark2_json,
    scene2_JurassicPark2_json,
    scene3_JurassicPark2_json,
    scene4_JurassicPark2_json,
    scene5_JurassicPark2_json,
    scene6_JurassicPark2_json,
    scene7_JurassicPark2_json,
    scene8_JurassicPark2_json,
    scene9_JurassicPark2_json,
} from '~/data/json/phimmoi/prehistoric/Jurassic/JurassicPark';

const frames_JurassicPark2 = [];

const scenes_json = [
    scene1_JurassicPark2_json,
    scene2_JurassicPark2_json,
    scene3_JurassicPark2_json,
    scene4_JurassicPark2_json,
    scene5_JurassicPark2_json,
    scene6_JurassicPark2_json,
    scene7_JurassicPark2_json,
    scene8_JurassicPark2_json,
    scene9_JurassicPark2_json,
];

function JurassicPark2() {
    return (
        <FilmInfo
            film_json={JurassicPark_json}
            part_json={JurassicPark2_json}
            scenes_json={scenes_json}
            frames={frames_JurassicPark2}
        />
    );
}

export default JurassicPark2;
