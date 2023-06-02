import { Piece } from '@/@types';
import Pieces from '@/@types/pieces';
import Tile from '@/components/Tile';

const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];

const pieces: Piece[] = [];

function grabPiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  const element = e.target as HTMLElement;
  if (element.classList.contains('piece')) {
    const x = e.clientX - 37.5;
    const y = e.clientY - 37.5;
    element.style.position = 'absolute';
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
  }
}

for (let p = 0; p < 2; p += 1) {
  const type = p === 0 ? 'black' : 'white';
  const y = p === 0 ? 7 : 0;

  pieces.push({ image: Pieces[`${type}Castle`], x: 0, y });
  pieces.push({ image: Pieces[`${type}Castle`], x: 7, y });

  pieces.push({ image: Pieces[`${type}Knight`], x: 1, y });
  pieces.push({ image: Pieces[`${type}Knight`], x: 6, y });

  pieces.push({ image: Pieces[`${type}Bishop`], x: 2, y });
  pieces.push({ image: Pieces[`${type}Bishop`], x: 5, y });

  pieces.push({ image: Pieces[`${type}Queen`], x: 3, y });
  pieces.push({ image: Pieces[`${type}King`], x: 4, y });
}

// Black Pieces definition

for (let i = 0; i < 8; i += 1) {
  pieces.push({ image: Pieces.blackPawn, x: i, y: 6 });
}

// White pieces definition

for (let i = 0; i < 8; i += 1) {
  pieces.push({ image: Pieces.whitePawn, x: i, y: 1 });
}

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
      onMouseDown={(e) => grabPiece(e)}
    >
      {board}
    </div>
  );
}

export default ChessBoard;
