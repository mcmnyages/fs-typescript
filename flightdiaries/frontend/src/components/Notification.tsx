interface Props {
  message: string;
}

const Notification = ({ message }: Props) => {
  if (!message) {
    return null;
  }

  return (
    <div
      style={{
        color: 'red',
        backgroundColor: '#fdd',
        padding: '10px',
        marginBottom: '10px',
      }}
    >
      {message}
    </div>
  );
};

export default Notification;