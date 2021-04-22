import './Chessboard.css'
import Tile from './Tile'
import React, {useRef} from 'react'

const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8']
const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

interface Piece {
    image: string
    x: number
    y: number
}

const pieces: Piece[] = [];

for(let i = 0; i < 8; i++){
pieces.push({image: "images/Chess_pdt60.png", x: i, y: 6 })
}
for(let i = 0; i < 8; i++){
pieces.push({image: "images/Chess_plt60.png", x: i, y: 1 })
}
//rooks
pieces.push({ image: "images/Chess_rdt60.png", x:0, y: 7})
pieces.push({ image: "images/Chess_rdt60.png", x:7, y: 7})
pieces.push({ image: "images/Chess_rlt60.png", x:0, y: 0})
pieces.push({ image: "images/Chess_rlt60.png", x:7, y: 0})

//bishops
pieces.push({ image: "images/Chess_bdt60.png", x:2, y: 7})
pieces.push({ image: "images/Chess_bdt60.png", x:5, y: 7})
pieces.push({ image: "images/Chess_blt60.png", x:5, y: 0})
pieces.push({ image: "images/Chess_blt60.png", x:2, y: 0})

//knights
pieces.push({ image: "images/Chess_ndt60.png", x:1, y: 7})
pieces.push({ image: "images/Chess_ndt60.png", x:6, y: 7})
pieces.push({ image: "images/Chess_nlt60.png", x:1, y: 0})
pieces.push({ image: "images/Chess_nlt60.png", x:6, y: 0})

//kings
pieces.push({ image: "images/Chess_kdt60.png", x:4, y: 7})
pieces.push({ image: "images/Chess_klt60.png", x:4, y: 0})

//queens
pieces.push({ image: "images/Chess_qdt60.png", x:3, y: 7})
pieces.push({ image: "images/Chess_qlt60.png", x:3, y: 0})



export default function Chessboard() {
    const chessboardRef = useRef<HTMLDivElement>(null); 
    let activePiece: HTMLElement | null = null;

    function grabPiece(e: React.MouseEvent) {
        const element = e.target as HTMLElement; 
        if(element.classList.contains("chess-piece")){
            const x = e.clientX - 50; 
            const y = e.clientY - 50; 
            element.style.position = "absolute";
            element.style.left = `${x}px`; 
            element.style.top = `${y}px`; 

            activePiece = element; 
        }
    }
    function movePiece(e: React.MouseEvent) {
        const chessboard = chessboardRef.current;
        if(activePiece && chessboard){
            const minX = chessboard.style.left
            const minY = chessboard.style.top
            const x = e.clientX - 50; 
            const y = e.clientY - 50; 
            activePiece.style.position = "absolute";
            // activePiece.style.left = `${x}px`; 
            // activePiece.style.top = `${y}px`;
            if(x < minX) {
                activePiece.style.left = `${minX}px`; 
            } else {
                activePiece.style.left = `${x}px`
            }
        }
    }

        function dropPiece(e: React.MouseEvent){
            if(activePiece) {
                activePiece = null; 
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