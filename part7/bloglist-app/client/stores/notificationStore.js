import { create } from 'zustand'

const useNotificationStore = create(set => ({
  notification: {message: null, type: null},
  setNotification: (message, type='success') => {
    console.log(message, type)
    return set({   
      notification: {
        message,
        type
      }
    })
  },
  clearNotification: () => {
    console.log('🧹 Clearing notification')
    return set({
      notification: { message: null, type: null }
    })
  }
}))

export const useNotification = () => useNotificationStore(state => state.notification)
export const useSetNotification = () => useNotificationStore(state => state.setNotification)
export const useClearNotification = () => useNotificationStore(state => state.clearNotification)

// export default notificationStore

//