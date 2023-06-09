/* eslint-disable no-else-return */
import React, { useEffect, useRef, useState } from 'react';
import { Piece } from '@/@types';
import { PieceType, Pieces, TeamType } from '@/@types/pieces';
import Tile from '@/components/Tile';
import Referee from '@/utils/referee/referee';

const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];

const initialBoardState: Piece[] = [];

for (let p = 0; p < 2; p += 1) {
  const team = p === 0 ? TeamType.OPONENT : TeamType.PLAYER;
  const type = p === 0 ? 'black' : 'white';
  const y = p === 0 ? 7 : 0;

  initialBoardState.push({
    image: Pieces[`${type}Castle`],
    x: 0,
    y,
    type: PieceType.CASTLE,
    team,
  });
  initialBoardState.push({
    image: Pieces[`${type}Castle`],
    x: 7,
    y,
    type: PieceType.CASTLE,
    team,
  });

  initialBoardState.push({
    image: Pieces[`${type}Knight`],
    x: 1,
    y,
    type: PieceType.KNIGHT,
    team,
  });
  initialBoardState.push({
    image: Pieces[`${type}Knight`],
    x: 6,
    y,
    type: PieceType.KNIGHT,
    team,
  });

  initialBoardState.push({
    image: Pieces[`${type}Bishop`],
    x: 2,
    y,
    type: PieceType.BISHOP,
    team,
  });
  initialBoardState.push({
    image: Pieces[`${type}Bishop`],
    x: 5,
    y,
    type: PieceType.BISHOP,
    team,
  });

  initialBoardState.push({
    image: Pieces[`${type}Queen`],
    x: 3,
    y,
    type: PieceType.QUEEN,
    team,
  });
  initialBoardState.push({
    image: Pieces[`${type}King`],
    x: 4,
    y,
    type: PieceType.KING,
    team,
  });
}

// Black Pieces definition

for (let i = 0; i < 8; i += 1) {
  initialBoardState.push({
    image: Pieces.blackPawn,
    x: i,
    y: 6,
    type: PieceType.PAWN,
    team: TeamType.OPONENT,
  });
}

// White Pieces definition

for (let i = 0; i < 8; i += 1) {
  initialBoardState.push({
    image: Pieces.whitePawn,
    x: i,
    y: 1,
    type: PieceType.PAWN,
    team: TeamType.PLAYER,
  });
}

function ChessBoard() {
  const tileWidth = 600 / 8;
  const tileHeight = 600 / 8;
  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
  const [activePiece, setActivePiece] = useState<HTMLDivElement | null>(null);
  const chessboardRef = useRef<HTMLDivElement>(null);
  const referee = new Referee();

  useEffect(() => {}, [pieces]);

  function grabPiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const chessboard = chessboardRef.current;
    const element = e.target as HTMLDivElement;
    if (element.classList.contains('piece') && chessboard) {
      setGridX(Math.floor((e.clientX - chessboard.offsetLeft) / 75));
      setGridY(
        Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 600) / 75))
      );
      const x = e.clientX - tileWidth / 2;
      const y = e.clientY - tileHeight / 2;
      element.style.position = 'absolute';
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      setActivePiece(element);
    }
  }

  function movePiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      const minX = chessboard.offsetLeft;
      const minY = chessboard.offsetTop;
      const maxX = chessboard.offsetLeft + chessboard.clientWidth;
      const maxY = chessboard.offsetTop + chessboard.clientHeight;
      const x = e.clientX - tileWidth / 2;
      const y = e.clientY - tileHeight / 2;
      activePiece.style.position = 'absolute';

      if (x < minX) {
        activePiece.style.left = `${minX}px`;
      } else if (x > maxX) {
        activePiece.style.left = `${maxX}px`;
      } else {
        activePiece.style.left = `${x}px`;
      }

      if (y < minY) {
        activePiece.style.top = `${minY}px`;
      } else if (y > maxY) {
        activePiece.style.top = `${maxY}px`;
      } else {
        activePiece.style.top = `${y}px`;
      }
    }
  }

  function dropPiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current;

    if (activePiece && chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / 75);
      const y = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 600) / 75)
      );

      // Updates the piece position
      setPieces((value) => {
        const tempPieces = value.map((p) => {
          if (p.x === gridX && p.y === gridY) {
            const validMove = referee.isValidMove(
              gridX,
              gridY,
              x,
              y,
              p.type,
              p.team
            );
            if (validMove) {
              return { ...p, x, y };
            } else {
              activePiece.style.position = 'relative';
              activePiece.style.removeProperty('left');
              activePiece.style.removeProperty('top');
            }
          }
          return p;
        });
        return tempPieces;
      });
      setActivePiece(null);
    }
  }

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
      onMouseMove={(e) => movePiece(e)}
      onMouseUp={(e) => dropPiece(e)}
      ref={chessboardRef}
    >
      {board}
    </div>
  );
}

export default ChessBoard;
