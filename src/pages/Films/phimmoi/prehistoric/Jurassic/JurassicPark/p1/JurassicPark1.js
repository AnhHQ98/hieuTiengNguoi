import FilmInfo from '~/layouts/components/FilmInfo';

import {
    JurassicPark_json,
    JurassicPark1_json,
    scene1_JurassicPark1_json,
    scene2_JurassicPark1_json,
    scene3_JurassicPark1_json,
} from '~/data/json/phimmoi';

const scenes_json = [
    scene1_JurassicPark1_json,
    scene2_JurassicPark1_json,
    scene3_JurassicPark1_json,
];

function JurassicPark1() {
    return (
        <FilmInfo
            film_json={JurassicPark_json}
            part_json={JurassicPark1_json}
            scenes_json={scenes_json}
        />
    )
}

export default JurassicPark1;
