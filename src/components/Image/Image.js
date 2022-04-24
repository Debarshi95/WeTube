const Image = ({ src, alt, height, width }) => {
  return (
    <div style={{ width, height }}>
      <img
        src={src}
        alt={alt || ''}
        className="w-full h-full"
        style={{ objectFit: 'fill', objectPosition: 'center' }}
      />
    </div>
  );
};

Image.defaultProps = {
  height: '100%',
  width: '100%',
};

export default Image;
