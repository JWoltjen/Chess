import './Chessboard.css'
import Tile from './Tile'
import React, {useState, useRef} from 'react'

const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8']
const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

interface Piece {
    image: string
    x: number
    y: number
}
const initialBoardState: Piece[] = []
        for(let i = 0; i < 8; i++){
        initialBoardState.push({image: "images/Chess_pdt60.png", x: i, y: 6 })
        }
        for(let i = 0; i < 8; i++){
        initialBoardState.push({image: "images/Chess_plt60.png", x: i, y: 1 })
        }
        //rooks
        initialBoardState.push({ image: "images/Chess_rdt60.png", x:0, y: 7})
        initialBoardState.push({ image: "images/Chess_rdt60.png", x:7, y: 7})
        initialBoardState.push({ image: "images/Chess_rlt60.png", x:0, y: 0})
        initialBoardState.push({ image: "images/Chess_rlt60.png", x:7, y: 0})

        //bishops
        initialBoardState.push({ image: "images/Chess_bdt60.png", x:2, y: 7})
        initialBoardState.push({ image: "images/Chess_bdt60.png", x:5, y: 7})
        initialBoardState.push({ image: "images/Chess_blt60.png", x:5, y: 0})
        initialBoardState.push({ image: "images/Chess_blt60.png", x:2, y: 0})

        //knights
        initialBoardState.push({ image: "images/Chess_ndt60.png", x:1, y: 7})
        initialBoardState.push({ image: "images/Chess_ndt60.png", x:6, y: 7})
        initialBoardState.push({ image: "images/Chess_nlt60.png", x:1, y: 0})
        initialBoardState.push({ image: "images/Chess_nlt60.png", x:6, y: 0})

        //kings
        initialBoardState.push({ image: "images/Chess_kdt60.png", x:4, y: 7})
        initialBoardState.push({ image: "images/Chess_klt60.png", x:4, y: 0})

        //queens
        initialBoardState.push({ image: "images/Chess_qdt60.png", x:3, y: 7})
        initialBoardState.push({ image: "images/Chess_qlt60.png", x:3, y: 0})

export default function Chessboard() {
    const [gridX, setGridX] = useState(0); 
    const [gridY, setGridY] = useState(0)
    const [pieces, setPieces] = useState<Piece[]>(initialBoardState)
    const chessboardRef = useRef<HTMLDivElement>(null); 

    let activePiece: HTMLElement | null = null;

    function grabPiece(e: React.MouseEvent) {
        const element = e.target as HTMLElement; 
        const chessboard = chessboardRef.current; 
        if(element.classList.contains("chess-piece") && chessboard ){
            const gridX = Math.floor((e.clientX - chessboard.offsetLeft) / 100); 
            const gridY = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100)); 
            setGridX(gridX)
            setGridY(gridY)
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

                setPieces(value => {
                    const pieces = value.map(p => {
                        if(p.x === 1 && p.y === 0){
                            p.x = x; 
                            p.y = y; 
                        }
                        return p; 
                    })
                    return pieces
                })
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