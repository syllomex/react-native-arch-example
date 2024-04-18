import { createStyles } from '@/lib/styles'
import { TouchableOpacity } from 'react-native'

export function Checkbox({
  value,
  onChange,
}: {
  value: boolean
  onChange: (value: boolean) => void
}) {
  return (
    <TouchableOpacity
      onPress={() => onChange(!value)}
      style={[styles.container, value && { backgroundColor: '#226' }]}
    />
  )
}

const styles = createStyles({
  container: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#DDD',
  },
})
