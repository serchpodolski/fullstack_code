import { useNotification } from "../../stores/notificationStore"
import '../styles/notificationStyles.css'
import { GiCheckMark } from "react-icons/gi";
import { GiCancel } from "react-icons/gi";

const Notification = () => {
  const { message, type } = useNotification()
  
  // const successStyles = {
  //   color: 'green',
  //   border: '5px solid green',
  // }
  // const errorStyles = {
  //   color: 'red',
  //   border: '5px solid red',
  // }
  // const styles = type === 'success' ? successStyles : errorStyles
  console.log(message, type)
  
  if (message === undefined || message === null) {
    return null
  }

  const styles = {
    color: type === 'success' ? '#155724' : '#721c24',
    border: `3px solid ${type === 'success' ? '#28a745' : '#dc3545'}`,
    backgroundColor: 'white'
  }


  // return (
  //   <div className="notification" style={styles}>
  //     {message}
  //   </div>
  // )

  return (
    <div className="modal-backdrop">
      <div className="notification-modal" style={styles}>
        <div className="modal-content">
          <span className="modal-icon">{type === 'success' ? <GiCheckMark /> : <GiCancel />}</span>
          <p>{message}</p>
        </div>
      </div>
    </div>
  )
}

export default Notification
