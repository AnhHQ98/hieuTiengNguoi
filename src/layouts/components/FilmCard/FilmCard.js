function FilmCard({ filmJson, partJson }) {
    return (
        <div>
            <h3>{filmJson.englishName} {partJson.part}</h3>
        </div>
    );
}

export default FilmCard;