const CardPlayer = ({ url, title, ...props }) => {
  console.log({ url, title });
  return <iframe src={url} title={title} {...props} />;
};

CardPlayer.defaultProps = {
  width: '100%',
  height: '80%',
};

export default CardPlayer;
