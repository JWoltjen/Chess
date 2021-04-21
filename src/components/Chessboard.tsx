import './Chessboard.css'
import Tile from './Tile'
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

function grabPiece(e: React.MouseEvent) {
    const element = e.target as HTMLElement; 
    if(element.classList.contains("chess-piece")){
        console.log(e)
    }
}
export default function Chessboard() {
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
    return <div onMouseDown={e => grabPiece(e)} id="chessboard">{board}</div>
    }