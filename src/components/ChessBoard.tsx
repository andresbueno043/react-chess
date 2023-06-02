import { Piece } from '@/@types';
import Pieces from '@/@types/pieces';
import Tile from '@/components/Tile';

const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];

const pieces: Piece[] = [];

// Black Pieces definition
for (let i = 0; i < 8; i += 1) {
  pieces.push({ image: Pieces.blackPawn, x: i, y: 6 });
}

pieces.push({ image: Pieces.blackCastle, x: 0, y: 7 });
pieces.push({ image: Pieces.blackCastle, x: 7, y: 7 });

pieces.push({ image: Pieces.blackKnight, x: 1, y: 7 });
pieces.push({ image: Pieces.blackKnight, x: 6, y: 7 });

pieces.push({ image: Pieces.blackBishop, x: 2, y: 7 });
pieces.push({ image: Pieces.blackBishop, x: 5, y: 7 });

pieces.push({ image: Pieces.blackQueen, x: 3, y: 7 });
pieces.push({ image: Pieces.blackKing, x: 4, y: 7 });

// White pieces definition

for (let i = 0; i < 8; i += 1) {
  pieces.push({ image: Pieces.whitePawn, x: i, y: 1 });
}

pieces.push({ image: Pieces.whiteCastle, x: 0, y: 0 });
pieces.push({ image: Pieces.whiteCastle, x: 7, y: 0 });

pieces.push({ image: Pieces.whiteKnight, x: 1, y: 0 });
pieces.push({ image: Pieces.whiteKnight, x: 6, y: 0 });

pieces.push({ image: Pieces.whiteBishop, x: 2, y: 0 });
pieces.push({ image: Pieces.whiteBishop, x: 5, y: 0 });

pieces.push({ image: Pieces.whiteQueen, x: 3, y: 0 });
pieces.push({ image: Pieces.whiteKing, x: 4, y: 0 });

function ChessBoard() {
  const board = [];

  for (let j = verticalAxis.length - 1; j >= 0; j -= 1) {
    for (let i = 0; i < horizontalAxis.length; i += 1) {
      let image = '';

      pieces.forEach((p) => {
        if (p.x === i && p.y === j) {
          image = p.image;
        }
      });

      board.push(<Tile key={`${i}${j}`} i={i} j={j} image={image} />);
    }
  }
  return (
    <div
      id="chessboard"
      className="grid grid-cols-8 grid-rows-[8] bg-[#779556] w-[600px] h-[600px]"
    >
      {board}
    </div>
  );
}

export default ChessBoard;
