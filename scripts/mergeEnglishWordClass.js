const fs = require('fs');
const path = require('path');
const inputDir = path.join(__dirname, '../data/json/english/vocabulary/wordClass');
const outputFile = path.join(__dirname, '../data/json/english/vocabulary/wordClass.json');

function readWordClass(dirPath) {
    let wordClass = {};
    const entries = fs.readdirSync(dirPath, {withFileTypes: true});
    for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const fullPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
            const nested = readWordClass(fullPath);
            wordClass = Object.assign({}, wordClass, nested);
        } else if (entry.isFile() && entry.name.endsWith('.json')) {
            try {
                const jsonString = fs.readFileSync(fullPath, 'utf8');
                const jsonObject = JSON.parse(jsonString);
                const type = path.basename(entry.name, '.json');
                for (const [word, info] of Object.entries(jsonObject)) {
                    wordClass[word] = info;
                }
            } catch(err) {
                console.error(`❌ Lỗi khi đọc hoặc parse file ${entry.name}:`, err);
            }
        }
    }
    return wordClass;
}

function mergeWordClass() {
    try {
        const mergedWordClass = readWordClass(inputDir);
        fs.writeFileSync(outputFile, JSON.stringify(mergedWordClass, null, 4), 'utf8');
    } catch(err) {
        console.error('❌ Lỗi khi gộp file JSON:', err);
    }
}

mergeWordClass();
