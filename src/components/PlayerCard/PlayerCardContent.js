const PlayerCardContent = ({ className, children, ...props }) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

export default PlayerCardContent;
