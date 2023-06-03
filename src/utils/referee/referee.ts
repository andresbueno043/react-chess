import { PieceType, TeamType } from '@/@types/pieces';

export default class Referee {
  // eslint-disable-next-line class-methods-use-this
  isValidMove(
    px: number,
    py: number,
    x: number,
    y: number,
    type: PieceType,
    team: TeamType
  ) {
    console.log('Referee is checking the move...');
    console.log(`Previous location: ${px}, ${py}`);
    console.log(`Current location: ${x}, ${y}`);
    console.log(`Piece type: ${type}`);

    if (type === PieceType.PAWN) {
      if (team === TeamType.PLAYER) {
        if (py === 1) {
          if (px === x && (y - py === 1 || y - py === 2)) {
            return true;
          }
        } else if (px === x && y - py === 1) {
          return true;
        }
      }
    }

    return false;
  }
}
