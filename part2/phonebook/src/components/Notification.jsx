const Notification = ({ message, type }) => {
  const successStyles = {
    color: 'green',
    border: '5px solid green',
  }
  const errorStyles = {
    color: 'red',
    border: '5px solid red',
  }
  const styles = type === 'success' ? successStyles : errorStyles
  console.log(message, type)
  if (message === undefined || message === null) {
    return null
  }

  return (
    <div className="notification" style={styles}>
      {message}
    </div>
  )
}

export default Notification