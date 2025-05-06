export const generateVietSubSegment = (shot, vietSubWords) => {
    let vietSubSegments = [shot.subtitle.vietSub];
    vietSubWords.forEach((vietSubWord) => {
        console.log(
            `🔍 Check "${vietSubWord}" có trong vietSub? 👉`,
            shot.subtitle.vietSub.includes(vietSubWord),
        );
        if (!vietSubWord) return;
        for (let i = 0; i < vietSubSegments.length; i++) {
            if (typeof vietSubSegments[i] !== 'string' || vietSubSegments[i] === vietSubWord) continue;
            if (vietSubSegments[i].indexOf(vietSubWord) !== -1) {
                let before = vietSubSegments[i].slice(
                    0,
                    vietSubSegments[i].indexOf(vietSubWord),
                );
                console.log('before: ', before);
                let after = vietSubSegments[i].slice(
                    vietSubSegments[i].indexOf(vietSubWord) +
                        vietSubWord.length,
                );
                console.log('after: ', after);
                let newVietSubSegments = [];
                if (before) newVietSubSegments.push(before);
                newVietSubSegments.push(vietSubWord);
                if (after) newVietSubSegments.push(after);
                vietSubSegments.splice(i, 1, ...newVietSubSegments);
                i = -1;
                break;
            }
        }
    });
    return vietSubSegments;
}