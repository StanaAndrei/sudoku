import getRandomSudokuBoard from "./generator.js";
import Validator from "./validator.js";
const table = document.querySelector('table');
const digitsDiv = document.querySelector('#digits');
const resetBtn = document.querySelector('#reset');
const messDiv = document.querySelector('#message');
const randBoard = getRandomSudokuBoard();
const validator = new Validator();
const EMPTYID = -1;
const emptyCells = 24;
let selectedBtn;
let gameBoard = new Array(9).fill().map(() => new Array(9).fill(0));

const getLineAndCol = btn => {
    const { id } = btn;
    let i;
    let line = 0;
    for (i = 4; id[i] !== '-'; i++) {
        line = 10 * line + Number(id[i]);
    }
    while (id[i] != 'l') {
        i++;
    }
    i++
    let col = 0;
    for (; id[i]; i++) {
        col = 10 * col + Number(id[i]);
    }
    return { line, col };
}

let currEmptyCells = emptyCells;
const checkGameOver = () => {
    if (!currEmptyCells) {
        messDiv.innerText = 'YOU WON!';
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                let cell = document.querySelector(`#line${i}-col${j}`);
                cell.disabled = true;
            }
        }
        let digBtns = document.querySelectorAll('#digits > button');
        for (let btn of digBtns) {
            btn.disabled = true;
        }
        resetBtn.disabled = true;
    }
};

const handleDigitBtnClick = e => {
    e.preventDefault();
    let { line, col } = getLineAndCol(selectedBtn);//*/
    let nr = Number(e.target.innerText);
    if (!validator.validate(nr, line, col, gameBoard)) {
        alert('Nr. invalid!');
        return;
    }
    currEmptyCells--;
    selectedBtn.innerText = `${nr}`;
    gameBoard[line][col] = nr;
    checkGameOver();
}

const handleBoardBtnClick = e => {
    e.preventDefault();
    if (selectedBtn) {
        selectedBtn.style.backgroundColor = 'grey';
    }
    selectedBtn = e.target;
    selectedBtn.style.backgroundColor = 'green';
}

resetBtn.addEventListener('click', e => {
    selectedBtn.innerText = '';
    currEmptyCells++;
});

//#region generate table
for (let i = 0; i < 9; i++) {
    let tr = document.createElement('tr');
    for (let j = 0; j < 9; j++) {
        let btn = document.createElement('button');
        let td = document.createElement('td');
        btn.id = `line${i}-col${j}`;
        //board on vertical
        if ((j + 1) % 3 === 0) {
            btn.classList.add('rightBoarded');
        } else if (j % 3 === 0) {
            btn.classList.add('leftBoarded');
        }
        //board on horizontal
        if ((i + 1) % 3 === 0) {
            btn.classList.add('bottomBoarded');
        } else if (i % 3 === 0) {
            btn.classList.add('topBoarded');
        }
        btn.addEventListener('click', handleBoardBtnClick);
        td.appendChild(btn);
        tr.appendChild(td);
    }
    table.appendChild(tr);
}
//#endregion
//#region generate digits
    for (let i = 1; i <= 9; i++) {
        let btn = document.createElement('button');
        btn.innerText = `${i}`;
        btn.addEventListener('click', handleDigitBtnClick);
        digitsDiv.appendChild(btn);
    }
//#endregion
//#region init board
const nrOfFullCells = 81 - emptyCells;
let currFullCells = 0;
const fillBoard = () => {
    const distribution = 15 / 100;
    for (let i = 0; i < 9 && currFullCells < nrOfFullCells; i++) {
        for (let j = 0; j < 9 && currFullCells < nrOfFullCells; j++) {
            let cell = document.querySelector(`#line${i}-col${j}`);
            if (Math.random() <= distribution && gameBoard[i][j] !== EMPTYID) {
                gameBoard[i][j] = EMPTYID;//let empty
            } else if (!gameBoard[i][j] && gameBoard[i][j] !== EMPTYID) {
                gameBoard[i][j] = randBoard[i][j];
                cell.innerText = `${gameBoard[i][j]}`;
                cell.disabled = true;
                currFullCells++;
                cell.classList.add('origin');
            }
        }
    }
}
while (currFullCells < nrOfFullCells) {
    fillBoard();
}
//console.log(randBoard);
//console.log(81 - currFullCells);
//#endregion
if ((new URLSearchParams(window.location.search)).has('show-ans')) {
    console.log(randBoard);
}
