type Props = {
  image?: string;
  i: number;
  j: number;
};

function Tile({ i, j, image }: Props) {
  let tileColor = '';

  if ((i + j) % 2 === 0) {
    tileColor = 'black';
  } else {
    tileColor = 'white';
  }

  return (
    <span
      className={`h-[75px] w-[75px] ${
        tileColor === 'white' ? 'bg-[#ebecd0]' : 'bg-[#779556]'
      }`}
    >
      {image ? <img src={image} alt="Piece" /> : ''}
    </span>
  );
}

Tile.defaultProps = {
  image: null,
};

export default Tile;
