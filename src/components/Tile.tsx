type Props = {
  image?: string;
  i: number;
  j: number;
};

function Tile({ i, j, image }: Props) {
  let tileColor = '';
  let tileStyle;

  if ((i + j) % 2 === 0) {
    tileColor = 'black';
  } else {
    tileColor = 'white';
  }

  if (image) {
    tileStyle = {
      backgroundImage: `url(${image})`,
      backgroundSize: 'contain', // or 'contain',
    };
  }

  return (
    <div
      className={`h-[75px] w-[75px] ${
        tileColor === 'white' ? 'bg-[#ebecd0]' : 'bg-[#779556]'
      } `}
    >
      <div
        className={`h-[75px] w-[75px] ${
          image ? 'cursor-grab active:cursor-grabbing piece' : ''
        }`}
        style={tileStyle}
      />
    </div>
  );
}

Tile.defaultProps = {
  image: null,
};

export default Tile;
