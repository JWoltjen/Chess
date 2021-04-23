import './Chessboard.css'
import Tile from './Tile'
import React, {useState, useRef} from 'react'
import Referee from './Referee'

const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8']
const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

interface Piece {
    image: string;
    x: number;
    y: number;
    type: PieceType; 
    team: TeamType
}

export enum PieceType{
    PAWN,
    BISHOP,
    KNIGHT,
    ROOK,
    QUEEN, 
    KING, 
}

export enum TeamType {
    OPPONENT, 
    OUR
}


const initialBoardState: Piece[] = []

        for(let p = 0; p <2; p++){
            const teamType = (p === 0) ? TeamType.OPPONENT : TeamType.OUR; 
            const type = (teamType === TeamType.OPPONENT) ? "b" : "w"; 
            const y = (teamType === TeamType.OPPONENT) ? 7 : 0; 
        
        initialBoardState.push({image: `images/rook_${type}.png`, x: 0, y, type: PieceType.ROOK, team: teamType})
        initialBoardState.push({image: `images/rook_${type}.png`, x: 7, y, type: PieceType.ROOK, team: teamType})
        initialBoardState.push({image: `images/knight_${type}.png`, x:1, y, type: PieceType.KNIGHT, team: teamType})
        initialBoardState.push({image: `images/knight_${type}.png`, x:6, y, type: PieceType.KNIGHT, team: teamType})
        initialBoardState.push({image: `images/bishop_${type}.png`, x:2, y, type: PieceType.BISHOP, team: teamType})
        initialBoardState.push({image: `images/bishop_${type}.png`, x:5, y, type: PieceType.BISHOP, team: teamType})
        initialBoardState.push({image: `images/king_${type}.png`, x:4, y, type: PieceType.KING, team: teamType})
        initialBoardState.push({image: `images/queen_${type}.png`, x:3, y, type: PieceType.QUEEN, team: teamType})
        }
        for(let i = 0; i < 8; i++){
        initialBoardState.push({image:`pawn_b.png`, x: i, y: 6, type: PieceType.PAWN, team: TeamType.OPPONENT})
        }
        for(let i = 0; i < 8; i++){
        initialBoardState.push({image: `pawn_w.png`, x: i, y: 1, type: PieceType.PAWN, team: TeamType.OUR})
        }


export default function Chessboard() {
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null)
    const [gridX, setGridX] = useState(0); 
    const [gridY, setGridY] = useState(0)
    const [pieces, setPieces] = useState<Piece[]>(initialBoardState)
    const chessboardRef = useRef<HTMLDivElement>(null); 
    const referee = new Referee()
    function grabPiece(e: React.MouseEvent) {
        const element = e.target as HTMLElement; 
        const chessboard = chessboardRef.current; 
        if(element.classList.contains("chess-piece") && chessboard ){
             Math.floor((e.clientX - chessboard.offsetLeft) / 100); 
            setGridX(Math.floor((e.clientX - chessboard.offsetLeft) / 100))
            setGridY(Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100))) 
            const x = e.clientX - 50; 
            const y = e.clientY - 50; 
            element.style.position = "absolute";
            element.style.left = `${x}px`; 
            element.style.top = `${y}px`; 
            setActivePiece(element)
        }
    }
    function movePiece(e: React.MouseEvent) {
        const chessboard = chessboardRef.current;
        if(activePiece && chessboard){
            const minX = chessboard.offsetLeft-25
            const minY = chessboard.offsetTop-25
            const maxX = chessboard.offsetLeft + chessboard.clientWidth -25; 
            const maxY = chessboard.offsetLeft + chessboard.clientHeight -25; 
            const x = e.clientX - 50; 
            const y = e.clientY - 50; 
            activePiece.style.position = "absolute";
            if(x < minX) {
                activePiece.style.left = `${minX}px`; 
            } else {
                activePiece.style.left = `${x}px`
            }
            if(y < minY) {
                activePiece.style.top = `${minY}px`; 
            } else {
                activePiece.style.top = `${y}px`
            }
        }
    }

        function dropPiece(e: React.MouseEvent){
            const chessboard = chessboardRef.current
            if(activePiece && chessboard) {
                const x = Math.floor((e.clientX - chessboard.offsetLeft) / 100); 
                const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100)); 
                
                //Updates the pieces position
                setPieces(value => {
                    const pieces = value.map(p => {
                        if(p.x === gridX && p.y === gridY){
                            (referee.isValidMove(gridX, gridY, x, y, p.type, p.team))
                            p.x = x; 
                            p.y = y; 
                        }
                        return p; 
                    })
                    return pieces
                })
                setActivePiece(null); 
            }
        }
    let board = []; 

    for(let j = verticalAxis.length-1; j >= 0; j--){
       for(let i=0; i<horizontalAxis.length; i++){
           const number = j + i + 2; 
           let image = undefined; 
            pieces.forEach(p => {
                if(p.x === i && p.y === j){
                    image = p.image; 
                }
            })
            board.push(<Tile key={`${j},${i}`} image={image} number={number}/>)
           }   
        }
    return (
         <div
            onMouseMove={(e) => movePiece(e)}
            onMouseDown={(e) => grabPiece(e)} 
            onMouseUp={(e) => dropPiece(e)}
            id="chessboard"
            ref={chessboardRef}>
                 {board}
            </div>
    )
    }