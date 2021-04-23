import { PieceType, TeamType } from './Chessboard'

export default class Referee {
    isValidMove(px: number, py: number, x: number, y: number, type: PieceType, team: TeamType){
        console.log("referee is checking the move")
        console.log(`Previous Location: (${px}, ${py})`)
        console.log(`Current Location: (${x}, ${y})`)
        console.log(`Piece type: ${type}`); 
        console.log(`Team: ${team}`)
        
        if(type === PieceType.PAWN) {
            if(team === TeamType.OUR){
                if(py === 1){
                    if(px === x && (y - py === 1 || y - py === 2)){
                        console.log("valid move")
                        return true; 
                    }
                }
            }
        }
        return false
    }
}