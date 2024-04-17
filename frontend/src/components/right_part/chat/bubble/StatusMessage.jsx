const StatusMessage = ({ message }) => {
  return (
    <div>
      <p className="text-center">{message?.value}</p>
    </div>
  );
};
export default StatusMessage;
