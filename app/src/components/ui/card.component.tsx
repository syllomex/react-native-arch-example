import { createStyles } from '@/lib/styles'
import { type PropsWithChildren } from '@/types/react'
import { View, type ViewProps } from 'react-native'

export function Card(props: PropsWithChildren<ViewProps>) {
  return <View {...props} style={[styles.container, props.style]} />
}

const styles = createStyles({
  container: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 4,
    padding: 8,
  },
})
