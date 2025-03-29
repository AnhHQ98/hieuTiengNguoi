import FilmInfo from '~/layouts/components/FilmInfo';

import {
    JurassicPark_json,
    JurassicPark2_json,
    scene1_JurassicPark2_json,
    scene2_JurassicPark2_json,
    scene3_JurassicPark2_json,
    scene4_JurassicPark2_json,
    scene5_JurassicPark2_json,
} from '~/data/json/phimmoi/prehistoric/Jurassic/JurassicPark';

const frame_JurassicPark2 = [];

const scenes_json = [
    scene1_JurassicPark2_json,
    scene2_JurassicPark2_json,
    scene3_JurassicPark2_json,
    scene4_JurassicPark2_json,
    scene5_JurassicPark2_json,
    scene6_JurassicPark2_json,
];

function JurassicPark2() {
    return (
        <FilmInfo
            film_json={JurassicPark_json}
            part_json={JurassicPark2_json}
            scenes_json={scenes_json}
            frames={frame_JurassicPark2}
        />
    );
}

export default JurassicPark2;
