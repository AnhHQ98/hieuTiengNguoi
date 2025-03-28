import FilmInfo from '~/layouts/components/FilmInfo';

import frame_scene1_JurassicPark1 from '~/assets/images/phimmoi/prehistoric/Jurassic/JurassicPark/part1/scene1';

import {
    JurassicPark_json,
    JurassicPark1_json,
    scene1_JurassicPark1_json,
    scene2_JurassicPark1_json,
    scene3_JurassicPark1_json,
    scene4_JurassicPark1_json,
    scene5_JurassicPark1_json,
    scene6_JurassicPark1_json,
    scene7_JurassicPark1_json,
} from '~/data/json/phimmoi/prehistoric/Jurassic/JurassicPark';

const frame_JurassicPark1 = [frame_scene1_JurassicPark1];

const scenes_json = [
    scene1_JurassicPark1_json,
    scene2_JurassicPark1_json,
    scene3_JurassicPark1_json,
    scene4_JurassicPark1_json,
    scene5_JurassicPark1_json,
    scene6_JurassicPark1_json,
    scene7_JurassicPark1_json,
];

function JurassicPark1() {
    return (
        <FilmInfo
            film_json={JurassicPark_json}
            part_json={JurassicPark1_json}
            scenes_json={scenes_json}
            frames={frame_JurassicPark1}
        />
    );
}

export default JurassicPark1;
