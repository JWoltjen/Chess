import { PieceType } from './Chessboard'

export default class Referee {
    isValidMove(px: number, py: number, x: number, y: number, type: PieceType){
        console.log("referee is checking the move")
        console.log(`Previous Location: (${px}, ${py})`)
        console.log(`Current Location: (${x}, ${y})`)
        console.log(`Piece type: ${type}`); 
        return true
    }
}