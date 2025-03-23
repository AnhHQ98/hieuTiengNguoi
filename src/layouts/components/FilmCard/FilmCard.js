function FilmCard({ film_json, part_json }) {
    return (
        <div>
            <h3>({part_json.year}) {film_json.englishName} {part_json.part}</h3>
        </div>
    );
}

export default FilmCard;