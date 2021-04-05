// creating Board /
// 2d
// first row land
// randomize Object ( creating them in func)
// moving the 2d object every 1s. 
// locate player - pug as bg
// moves - with arrows can ran in 2d array
// if player in same div as shop items - toys or food -> added to inventory
// if player in same div as block item - wall, rock  -> fail in mission.
// exit option - adding as div background every 30s.
import GameBoard from '../../Components/GameBoard/GameBoard.Component'

const GameShop = () => {
    return (
        <div>
            <GameBoard />
        </div>
    )
}

export default GameShop;