function FilmInfo({ filmJson, partJson }) {
    return (
        <div>
            <h3>
                ({partJson.year}) {filmJson.englishName} {partJson.part}
            </h3>
            <h4>Directed by: {filmJson.director}</h4>
            <h5>Country: {filmJson.country}</h5>
            <h5>Duration: {partJson.duration} minutes</h5>
        </div>
    );
}

export default FilmInfo;