function FilmCard({ film_json }) {
    return (
        <div>
            <h3>
                ({film_json.year}) {film_json.englishName} {film_json.part}
            </h3>
        </div>
    );
}

export default FilmCard;