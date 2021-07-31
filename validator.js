export default class Validator {
    #isValidLine() {
        let {nr, line, col, board} = this;
        for (let j = 0; j < 9; j++) {
            if (board[line][j] === nr && col !== j) {
                return false;
            }
        }
        return true;
    }
    #isValidCol() {
        let {nr, line, col, board} = this;
        for (let i = 0; i < 9; i++) {
            if (board[i][col] === nr && line !== i) {
                return false;
            }
        }
        return true;
    }
    #isValidRegion() {
        let {nr, line, col, board} = this;
        let startI = Math.floor(line / 3) * 3, startJ = Math.floor(col / 3) * 3;
        let endI = startI + 3, endJ = startJ + 3;
        for (let i = startI; i < endI; i++) {
            for (let j = startJ; j < endJ; j++) {
                if (board[i][j] === nr && i !== line && j !== col) {
                    return false;
                }
            }
        }
        return true;
    }
    validate(nr, line, col, board) {
        this.nr = nr;
        this.line = line;
        this.col = col;
        this.board = board;
        let isValid = true;
        isValid &= this.#isValidLine();
        isValid &= this.#isValidCol();
        isValid &= this.#isValidRegion();
        return isValid;
    }
}