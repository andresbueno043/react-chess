import React from 'react';

type Props = {
  i: number;
  j: number;
};

function Tile({ i, j }: Props) {
  let tileColor = '';

  if ((i + j) % 2 === 0) {
    tileColor = 'black';
  } else {
    tileColor = 'white';
  }

  return (
    <span
      className={`h-[75px] w-[75px] ${
        tileColor === 'white' ? 'bg-[#ebecd0]' : 'bg-[#779556'
      }`}
    />
  );
}

export default Tile;
