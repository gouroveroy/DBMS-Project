function Hello(props) {
  const {name, message, emoji, roll} = props;
  return (
    <div>
      <h1>
        {message} {name} {emoji} {roll}
      </h1>
    </div>
  );
}

export default Hello;
