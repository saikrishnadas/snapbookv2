import { createContext } from 'react'
import { useState } from 'react'

const ModalContext = createContext()

export function ModalProvider({ children }) {
  const [open, setOpen] = useState(false)
  const openModal = () => {
    setOpen(true)
  }
  const closeModal = () => {
    setOpen(false)
  }

  return (
    <ModalContext.Provider value={{ open, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export default ModalContext
