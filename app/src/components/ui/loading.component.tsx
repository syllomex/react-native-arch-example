import { ActivityIndicator } from 'react-native'

export function Loading() {
  return <ActivityIndicator size="large" color="#226" />
}

function LoadingSmall() {
  return <ActivityIndicator size="small" color="#226" />
}

Loading.Small = LoadingSmall
