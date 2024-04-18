import { type PropsWithChildren } from '@/types/react'
import { createContext, useContext, type Dispatch, type SetStateAction } from 'react'
import { Text, TouchableOpacity, View, Modal as _Modal } from 'react-native'

type ModalProps = PropsWithChildren<{
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}>

interface ModalContext {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

type ContentProps = PropsWithChildren

type TitleProps = PropsWithChildren

type ToggleProps = PropsWithChildren

const modalContext = createContext<Omit<ModalContext, 'children'> | null>(null)

const useModal = () => {
  const props = useContext(modalContext)
  if (props == null) throw new Error('Modal components must be within a <Modal> scope')
  return props
}

export function Modal({ children, ...props }: ModalProps) {
  return <modalContext.Provider value={props}>{children}</modalContext.Provider>
}

function Content({ children }: ContentProps) {
  const { open, setOpen } = useModal()
  return (
    <_Modal visible={open} onRequestClose={() => setOpen(false)} animationType="slide">
      {children}
    </_Modal>
  )
}

function Title({ children }: TitleProps) {
  const { setOpen } = useModal()
  return (
    <View>
      <Text style={{ fontWeight: '500' }}>{children}</Text>
      <TouchableOpacity onPress={() => setOpen(false)}>
        <Text>Fechar</Text>
      </TouchableOpacity>
    </View>
  )
}

function Toggle({ children }: ToggleProps) {
  const { setOpen } = useModal()
  return <TouchableOpacity onPress={() => setOpen(cur => !cur)}>{children}</TouchableOpacity>
}

Modal.Content = Content
Modal.Title = Title
Modal.Toggle = Toggle
