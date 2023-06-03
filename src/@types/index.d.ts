import Pieces, { PieceType, TeamType } from '@/@types/pieces';

interface Piece {
  image: Pieces;
  x: number;
  y: number;
  type: PieceType;
  team: TeamType;
}
