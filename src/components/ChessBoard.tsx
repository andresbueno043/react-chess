import Tile from '@/components/Tile';

const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];

function ChessBoard() {
  const board = [];

  for (let j = verticalAxis.length - 1; j >= 0; j -= 1) {
    for (let i = 0; i < horizontalAxis.length; i += 1) {
      board.push(<Tile i={i} j={j} />);
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
