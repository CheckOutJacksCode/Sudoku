const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const visited = [];

class Field {
    constructor(field) {
        this.field = field;
    }
    static generateField (height, width, percentage) {
        let newField = [];
        let totalCells = height * width;
        for(let i=0; i<width; i++) {
            newField.push([]);
            for(let j=0; j<height; j++) {
                newField[i].push(fieldCharacter);
            }
        }
        let holes = percentage / 100 * totalCells;
        let usedSets = [];
        for(let k=0; k<holes; k++) {
            let randRow = Math.floor(Math.random()*width);
            let randCol = Math.floor(Math.random()*height);
            //usedSets.push([randRow, randCol]);
            while (usedSets.includes([randRow, randCol])) {
                randRow = Math.floor(Math.random()*width);
                randCol = Math.floor(Math.random()*height);
            }
            usedSets.push([randRow, randCol]);
            newField[randRow][randCol] = hole;
        }
        let randRow = Math.floor(Math.random()*width);
        let randCol = Math.floor(Math.random()*height);
        newField[randRow][randCol] = hat;
//        newField[0][0] = pathCharacter;
        return newField;
    }
    printField () {
        this.field.forEach(arr => {
            console.log(arr.join(' '));
        })
    }
    play () {
        let rowIndex = 0;
        let colIndex = 0;
        let currentCell = this.field[rowIndex][colIndex];
        while (true) {
            let move = prompt("Make a move; up, down, right, left: ");
            if (move === 'l') {
                colIndex -= 1;
                if (colIndex < 0) {
                    console.log('loser!');
                    break;
                }
            }
            else if (move === 'u') {
                rowIndex -= 1;
                if (rowIndex < 0) {
                    console.log('loser!');
                    break;
                }
            }
            else if (move === 'r') {
                colIndex += 1;
                if (colIndex >= width) {
                    console.log('loser!');
                    break;
                }
            }
            else if (move === 'd') {
                rowIndex += 1;
                if (rowIndex >= height) {
                    console.log('loser');
                    break;
                }
            } else {
                continue;
            }

            currentCell = this.field[rowIndex][colIndex];
            if (currentCell === '^') {
                console.log('you win!');
                break;
            }
            if (currentCell === hole) {
                console.log('you fell in a hole, dude.');
                break;
            }
            this.field[rowIndex][colIndex] = pathCharacter;
            this.printField();
        }
    } 
    max (lower, upper) {
        if (lower > upper) {
            return lower;
        }
        else {
            return upper;
        }
    }
    min (lower, upper) {
        if (lower < upper) {
            return lower;
        } else {
            return upper;
        }
    }
    checkIfVisited(row, col, num) {
        for (let i = 0; i < visited.length; i++) {
            //console.log(visited[i][0]);
            //console.log(visited[i][1]);
            if (visited[i][0] === row && visited[i][1] === col) {
                return true
            }
        }
        return false;
    }

    solveField (row, col) {
        //console.log(this.field[row][col]);
        if (this.field[row][col] === hat) {
            return true;
        }
        else {
            visited.push([row, col])
            //console.log(visited);
            //console.log(this.checkVisited(2, 4));
            //console.log(width);
            if ((col + 1) < width) {
                if (this.field[row][col + 1] !== hole) {
                    if (this.checkIfVisited(row, (col + 1), 1) === false) {
                        if (this.solveField(row, (col + 1))) {
                            return true;
                        }
                        //return;
                    }
                }
            }
            if (row > 0) {
                if (this.field[row - 1][col] !== hole) {
                    if (this.checkIfVisited((row - 1), col, 2) === false) {
                        if (this.solveField((row - 1), col)) {
                            return true;
                        }

                        //return;
                    }
                }
            }
            if (col > 0) {
                if (this.field[row][col - 1] !== hole) {
                    if (this.checkIfVisited(row, (col - 1), 3) === false) {
                        //console.log('third one');
                        if (this.solveField(row, (col - 1))) {
                            return true;
                        }
                    }
                }
            }
            if ((row + 1) < height) {
                if (this.field[row + 1][col] !== hole) {
                    if (this.checkIfVisited((row + 1), col, 4) === false) {
                        //console.log('fourth one');
                        if (this.solveField((row + 1), col)) {
                            return true;
                        }
                    }
                }
            }
            //visited.push(topCell);
            //this.solveField(previous[0], previous[1]);
            //let row = previousCell[0];
            //let col = previousCell[1];
            //this.solveField(row, col);
            //console.log('you suck');
        }
        return false;
    }
}
const height = prompt('pick a height: ');
const width = prompt('pick a width: ');
const percentage = prompt('percentage of holes: ');
const field = new Field(Field.generateField(height, width, percentage));
field.printField();
//field.play();
if (field.solveField(0, 0)) {
    field.play();
} else {
    console.log('field is unsolvable.');
}