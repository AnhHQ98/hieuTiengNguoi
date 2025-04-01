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
    scene10_JurassicPark2_json,
    scene11_JurassicPark2_json,
    scene12_JurassicPark2_json,
    scene13_JurassicPark2_json,
} from '~/data/json/phimmoi/prehistoric/Jurassic/JurassicPark';

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
    scene10_JurassicPark2_json,
    scene11_JurassicPark2_json,
    scene12_JurassicPark2_json,
    scene13_JurassicPark2_json,
];

const frames_JurassicPark2 = scenes_json.map((scene, sceneIndex) =>
    scene.map(
        (_, frameIndex) =>
            `/images/phimmoi/prehistoric/Jurassic/JurassicPark/part2/scene${sceneIndex + 1}/frame${frameIndex + 1}_scene${sceneIndex + 1}_JurassicPark2.jpg`,
    ),
)

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
