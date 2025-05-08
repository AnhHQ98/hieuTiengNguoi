const fs = require('fs');
const path = require('path');

// Load utils
const { groupPhraseWord } = require('../src/layouts/components/FilmInfo/utils/groupPhraseWord');
const { normalizeEnglishWord } = require('../src/layouts/components/FilmInfo/utils/normalizeEnglishWord');

// Đường dẫn gốc
const wordClassPath = path.join(__dirname, '../data/json/english/vocabulary/wordClass.json');
const phimmoiRoot = path.join(__dirname, '../data/json/phimmoi');
const outputPath = path.join(__dirname, '../data/json/english/vocabulary/englishWordAppearance.json');

// Load wordClass
const wordClass = JSON.parse(fs.readFileSync(wordClassPath, 'utf8'));
const wordAppearance = {};

// Đệ quy duyệt thư mục
function scanFilmDirectories(dirPath) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
            scanFilmDirectories(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.json') && !entry.name.startsWith('scene')) {
            processFilm(fullPath);
        }
    }
}

// Xử lý từng phim
function processFilm(filmJsonPath) {
    const filmData = JSON.parse(fs.readFileSync(filmJsonPath, 'utf8'));
    const filmDir = path.dirname(filmJsonPath);

    const englishName = filmData.englishName;
    const part = filmData.part;
    const sceneList = filmData.sceneList;

    if (!englishName || !part || !Array.isArray(sceneList)) return;

    sceneList.forEach((scene) => {
        const sceneFileName = `scene${scene.scene}_${englishName.replace(/\s+/g, '')}${part}.json`;
        const scenePath = path.join(filmDir, sceneFileName);
        if (!fs.existsSync(scenePath)) return;

        let shots;
        try {
            shots = JSON.parse(fs.readFileSync(scenePath, 'utf8'));
        } catch (err) {
            console.error(`❌ Không đọc được file: ${scenePath}`);
            return;
        }

        shots.forEach((shot, i) => {
            const engSub = shot.subtitle?.engSub;
            const character = shot.character?.name || '';
            const shotNumber = shot.shotNumber;

            if (!engSub || typeof engSub !== 'string' || engSub.trim() === '') return;

            let engSubWords = engSub.match(/[a-zA-Z0-9]+|[.,!?…]+|\s+/g) || [];
            engSubWords = groupPhraseWord(engSubWords, engSub, wordClass);

            engSubWords.forEach((engSubWord, i) => {
                if (/^[.,!?…\s]+$/.test(engSubWord)) return;

                const previousChar1 = engSubWords[i - 1] || null;
                const previousChar2 = engSubWords[i - 2] || null;
                const englishWord = normalizeEnglishWord(engSubWord, previousChar1, previousChar2, i);

                if (!wordClass[englishWord]) return;

                if (!wordAppearance[englishWord]) wordAppearance[englishWord] = {};
                if (!wordAppearance[englishWord][englishName]) {
                    wordAppearance[englishWord][englishName] = {
                        part: part,
                        scenes: {},
                    };
                }
                if (!wordAppearance[englishWord][englishName].scenes[scene.scene]) {
                    wordAppearance[englishWord][englishName].scenes[scene.scene] = [];
                }

                wordAppearance[englishWord][englishName].scenes[scene.scene].push({
                    shot: shotNumber,
                    character: character,
                    dialogue: engSub,
                });
            });
        });
    });
}

// Bắt đầu chạy
scanFilmDirectories(phimmoiRoot);
fs.writeFileSync(outputPath, JSON.stringify(wordAppearance, null, 4), 'utf8');
console.log('✅ Đã tạo xong englishWordAppearance.json');
