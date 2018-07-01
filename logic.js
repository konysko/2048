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

  setScore(number) {
    this.score += eval(number);
    let score = document.querySelector('div#score').innerHTML = this.score;
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

  afterMove (madeMove) {
    const freeTiles = this.findFreeTiles();
    if (madeMove && freeTiles) {
      this.putValueOnEmptyPlace();
    } else if (!freeTiles) this.finished = true;
  }
  moveLeft() {
    let madeMove = false;
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
            if (end.index !== col) madeMove = true;
          } else if (number === end.value) {
            this.removeNumber(tile);
            const newNumber = eval(number) + eval(number);
            this.setScore(newNumber);
            this.setNumber(this.board[row][end.index], newNumber.toString());
            end.value = "";
            end.index++;
            madeMove = true;
          } else if (number !== end.value) {
            this.removeNumber(tile);
            end.value = number;
            end.index++;
            this.setNumber(this.board[row][end.index], number);
            if (end.index !== col) madeMove = true;
          }
        }
      }
    }
    this.afterMove(madeMove);
  }

  moveRight() {
    let madeMove = false;
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
            if (end.index !== col) madeMove = true;
          } else if (number === end.value) {
            this.removeNumber(tile);
            const newNumber = eval(number) + eval(number);
            this.setScore(number);
            this.setNumber(this.board[row][end.index], newNumber.toString());
            madeMove = true;
            end.value = "";
            end.index--;
          } else if (number !== end.value) {
            this.removeNumber(tile);
            end.value = number;
            end.index--;
            this.setNumber(this.board[row][end.index], number);
            if (end.index !== col) madeMove = true;
          }
        }
      }
    }
    this.afterMove(madeMove);
  }

  moveTop() {
    let madeMove = false;
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
            if (end.index !== col) madeMove = true;

          } else if (number === end.value) {
            this.removeNumber(tile);
            const newNumber = eval(number) + eval(number);
            this.setScore(number);
            this.setNumber(this.board[end.index][col], newNumber.toString());
            madeMove = true;
            end.value = "";
            end.index++;
          } else if (number !== end.value) {
            this.removeNumber(tile);
            end.value = number;
            end.index++;
            this.setNumber(this.board[end.index][col], number);
            if (end.index !== row) madeMove = true;

          }
        }
      }
    }
    this.afterMove(madeMove);
  }

  moveBottom() {
    let madeMove = false;
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
            if (end.index !== col) madeMove = true;
          } else if (number === end.value) {
            this.removeNumber(tile);
            const newNumber = eval(number) + eval(number);
            this.setScore(number);
            this.setNumber(this.board[end.index][col], newNumber.toString());
            end.value = "";
            end.index--;
            madeMove = true;
          } else if (number !== end.value) {
            this.removeNumber(tile);
            end.value = number;
            end.index--;
            this.setNumber(this.board[end.index][col], number);
            if (end.index !== row) madeMove = true;
          }
        }
      }
    }
    this.afterMove(madeMove);
  }


  removeNumber(tile) {
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

  clearBoard () {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this.removeNumber(this.board[i][j]);
      }
    }
  }
}
