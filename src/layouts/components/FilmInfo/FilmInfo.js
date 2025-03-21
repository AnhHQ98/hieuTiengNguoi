function FilmInfo({ filmJson, partJson }) {
    return (
        <div>
            <h3>
                {filmJson.englishName} {partJson.part}
            </h3>
            <h4>Director: {filmJson.director}</h4>
            <p>Year: {partJson.year}</p>
            <p>Country: {filmJson.country}</p>
            <p>Duration: {partJson.duration}</p>
        </div>
    );
}

export default FilmInfo;