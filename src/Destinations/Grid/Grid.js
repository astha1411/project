import React from "react";
import "./Grid.css";
import Square from "../Square/Square";

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(100).fill(0),
      numbers: [],
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = 1;
    const numbers = this.state.numbers;
    numbers.push(i);
    this.setState({ squares: squares, numbers: numbers });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  BFS = () => {
    const numbers = this.state.numbers.slice();
    let dirns = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ];
    const squares = this.state.squares.slice();

    for (let i = 0; i < numbers.length; i++) {
      const queue = [];
      let visited = Array(100).fill(0),
        level = 1;

      queue.push(numbers[i]);

      while (queue.length !== 0) {
        let size = queue.length;
        level++;

        while (size-- > 0) {
          let removedSquare = queue.shift();

          let x = Math.floor(removedSquare / 10);
          let y = removedSquare % 10;

          for (let j = 0; j < 4; j++) {
            let newx = x + dirns[j][0];
            let newy = y + dirns[j][1];

            let cellValue = newx * 3 + newy;

            if (
              newx >= 0 &&
              newy >= 0 &&
              newx < 10 &&
              newy < 10 &&
              visited[cellValue] === 0 &&
              squares[cellValue] !== 1
            ) {
              visited[cellValue] = 1;
              queue.push(cellValue);
              squares[cellValue] += level;
            }
          }
        }
      }
    }
    const temp = [];

    for (let i = 0; i < 100; i++) {
      if (squares[i] !== 0) temp.push(squares[i]);
    }
    var min = Math.min.apply(null, temp);
    let secondMin = Math.min.apply(
      null,
      temp.filter((n) => n !== min)
    );
    console.log("min: " + min + "secondmin" + secondMin);

    for (let i = 0; i < 100; i++) {
      if (squares[i] === secondMin) squares[i] = "F";
    }
    this.setState({ squares: squares });
  };

  render() {
    const grid = [];
    for (let row = 0; row < 10; row++) {
      const currentRow = [];

      for (let col = 0; col < 10; col++) {
        currentRow.push(
          <span key={row * 10 + col}>{this.renderSquare(row * 10 + col)}</span>
        );
      }
      grid.push(
        <div className="gridRows" key={row}>
          {currentRow}
        </div>
      );
    }
    return (
      <div>
        <div className="grid">{grid}</div>
        <button className="start" onClick={() => this.BFS()}>
          Find Feasible Location
        </button>
      </div>
    );
  }
}

export default Grid;
