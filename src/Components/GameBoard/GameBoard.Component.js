import './GameBoard.css'

const GameBoard = () => {
    let boardObj = {};

    for (let row = 0; row < 15; row++){
        for (let column = 0; column < 25; column++){
            if (row == 14){
                boardObj[`${row}.${column}`] = (
                  <div className='land'/>
                );
            } else if (row == 6 && column == 1) {
                boardObj[`${row}.${column}`] = <div className="pug" />;
            }
            else {
                boardObj[`${row}.${column}`] = < div>{row}.{column}</div>;
            }
        }
    }


    return (
        <div className='game-board'> 
            {Object.values(boardObj).map(divs => divs)}
        </div>
    )
}

export default GameBoard;