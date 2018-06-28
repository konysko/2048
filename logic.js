class Game {
  constructor() {
    this.size = 4;
    this.board = Array.from(Array(this.size), () => new Array(this.size));
    this.initBoard();
    this.score = 0;
    this.finished = false;
    this.putValueOnEmptyPlace();
    this.putValueOnEmptyPlace();

  }

  move (event) {
    if (this.finished) {
      return;
    }
    switch (event.keyCode) {
      case 37:
        //left
        this.moveLeft();
        break;
      case 38:
        //top
        this.moveTop();
        break;
      case 39:
        //right
        this.moveRight();
        break;
      case 40:
        //bottom
        this.moveBottom();
        break;
    }
  }

  afterMove () {
    if (!this.findFreeTiles()) this.finished = true;
    else this.putValueOnEmptyPlace();
  }
  moveLeft() {
    for (let row = 0; row < this.size; row++) {
      let end = {
        index: 0,
        value: this.board[row][0].innerHTML
      };
      for (let col = 1; col < this.size; col++) {
        let tile = this.board[row][col];
        if (tile.innerHTML) {
          const number = tile.innerHTML;
          if (!end.value) {
            this.removeNumber(tile);
            this.setNumber(this.board[row][end.index], number);
            end.value = number;
          } else if (number === end.value) {
            this.removeNumber(tile);
            const newNumber = eval(number) + eval(number);
            this.score += newNumber;
            this.setNumber(this.board[row][end.index], newNumber.toString());
            end.value = "";
            end.index++;
          } else if (number !== end.value) {
            this.removeNumber(tile);
            end.value = number;
            end.index++;
            this.setNumber(this.board[row][end.index], number);
          }
        }
      }
    }
    this.afterMove();
  }

  moveRight() {
    for (let row = 0; row < this.size; row++) {
      let end = {
        index: this.size - 1,
        value: this.board[row][this.size - 1].innerHTML
      };
      for (let col = this.size - 2; col >= 0; col--) {
        let tile = this.board[row][col];
        if (tile.innerHTML) {
          const number = tile.innerHTML;
          if (!end.value) {
            this.removeNumber(tile);
            this.setNumber(this.board[row][end.index], number);
            end.value = number;
          } else if (number === end.value) {
            this.removeNumber(tile);
            const newNumber = eval(number) + eval(number);
            this.score += newNumber;
            this.setNumber(this.board[row][end.index], newNumber.toString());
            end.value = "";
            end.index--;
          } else if (number !== end.value) {
            this.removeNumber(tile);
            end.value = number;
            end.index--;
            this.setNumber(this.board[row][end.index], number);
          }
        }
      }
    }
    this.afterMove();
  }

  moveTop() {
    for (let col = 0; col < this.size; col++) {
      let end = {
        index: 0,
        value: this.board[0][col].innerHTML
      };
      for (let row = 1; row < this.size; row++) {
        let tile = this.board[row][col];
        if (tile.innerHTML) {
          const number = tile.innerHTML;
          if (!end.value) {
            this.removeNumber(tile);
            this.setNumber(this.board[end.index][col], number);
            end.value = number;
          } else if (number === end.value) {
            this.removeNumber(tile);
            const newNumber = eval(number) + eval(number);
            this.score += newNumber;
            this.setNumber(this.board[end.index][col], newNumber.toString());
            end.value = "";
            end.index++;
          } else if (number !== end.value) {
            this.removeNumber(tile);
            end.value = number;
            end.index++;
            this.setNumber(this.board[end.index][col], number);
          }
        }
      }
    }
    this.afterMove();
  }

  moveBottom() {
    for (let col = 0; col< this.size; col++) {
      let end = {
        index: this.size - 1,
        value: this.board[this.size - 1][col].innerHTML
      };
      for (let row = this.size-2; row >= 0; row--) {
        let tile = this.board[row][col];
        if (tile.innerHTML) {
          const number = tile.innerHTML;
          if (!end.value) {
            this.removeNumber(tile);
            this.setNumber(this.board[end.index][col], number);
            end.value = number;
          } else if (number === end.value) {
            this.removeNumber(tile);
            const newNumber = eval(number) + eval(number);
            this.score += newNumber;
            this.setNumber(this.board[end.index][col], newNumber.toString());
            end.value = "";
            end.index--;
          } else if (number !== end.value) {
            this.removeNumber(tile);
            end.value = number;
            end.index--;
            this.setNumber(this.board[end.index][col], number);
          }
        }
      }
    }
    this.afterMove();
  }


  removeNumber(tile) {
    const no = tile.innerHTML;
    console.log(`l${no}`);
    tile.classList.remove(...tile.classList);
    tile.classList.add('tile');
    tile.innerHTML = "";
  }

  setNumber(tile, no) {
    tile.innerHTML = no;
    tile.classList.add(`l${no}`);
  }

  putValueOnEmptyPlace() {
    let place;
    while (true) {
      const {row, column} = this.generateRandom();
      place = this.board[row][column];
      if (!place.innerHTML) {
        const number = Math.random() > 0.8 ? 4 : 2;
        place.classList.add(`l${number}`);
        place.innerHTML = number;
        break;
      }
    }
  }
  generateRandom() {
    return {
      row: Math.floor(Math.random() * this.size),
      column: Math.floor(Math.random() * this.size)
    }
  }
  initBoard() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this.board[i][j] = document.querySelector(`div#l${i * this.size + j}`);
      }
    }

  }
  findFreeTiles () {
    return this.board.reduce((a,b) => a + b.filter(item => item.innerHTML === '').length,0);
  }

//     iterateOver (callback) {
//         this.board.map((row, indexRow) => {
//            return row.map((element, indexCol) => {
//                return callback(element);
//            }); 
//         });
//     }
}
