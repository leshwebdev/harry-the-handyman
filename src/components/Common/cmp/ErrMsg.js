function ErrMsg(props) {
  return (
    <span className={(props.userUpdate) ? "inline-err-msg form-text" : "err-msg form-text"}>
      {props.errors.map((error, index) => (
        <div key={index}>{error}</div>
      ))}
    </span>
  );
}

export default ErrMsg;
