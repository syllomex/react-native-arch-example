import { createStyles } from '@/lib/styles'
import { type PropsWithChildren } from '@/types/react'
import { View, type ViewProps } from 'react-native'

export function Container(props: PropsWithChildren<ViewProps>) {
  return <View {...props} style={[styles.container, props.style]} />
}

const styles = createStyles({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
})
