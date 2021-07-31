const getRandomSudokuBoard = () => {
    //#region other functions
    const randShuffleArr = arr => arr.sort(() => Math.random() - .5);
    const cyclicPermuteArr = arr => {
        const last = arr.pop();
        arr.splice(0, 0, last);
    };
    //#endregion
    let randPattern = [];
    for (let i = 1; i <= 9; i++) {
        randPattern.push(i);
    }
    randShuffleArr(randPattern);
    let randSudokuBoard = new Array(9).fill().map(() => new Array(9).fill(0));
    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 3; i++) {
            const startI = i * 3, endI = startI + 3;
            const startJ = j * 3, endJ = startJ + 3;
            let index = 0;//index in randPattern
            for (let i2 = startI; i2 < endI; i2++) {
                for (let j2 = startJ; j2 < endJ; j2++) {
                    randSudokuBoard[i2][j2] = randPattern[index++];
                }
            }
            cyclicPermuteArr(randPattern);
        }
    }
    return randSudokuBoard;
};

export default getRandomSudokuBoard;