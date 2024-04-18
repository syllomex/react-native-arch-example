import { useState } from 'react'
import { Button, TextInput, View } from 'react-native'

interface Props {
  onSubmit: (data: { title: string }) => Promise<void>
}

export function TaskFormComponent({ onSubmit }: Props) {
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')

  const handleSubmit = async () => {
    try {
      setLoading(true)
      await onSubmit({ title })
    } finally {
      setLoading(false)
    }
  }

  return (
    <View>
      <TextInput placeholder="Título" value={title} onChangeText={setTitle} />
      <Button title={loading ? 'Salvando' : 'Salvar'} onPress={handleSubmit} disabled={loading} />
    </View>
  )
}
