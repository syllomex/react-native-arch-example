import { apolloClient } from '@/lib/apollo'
import { TaskListContainer } from '@/modules/task/containers'
import { ApolloProvider } from '@apollo/client'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

import { init } from '@/events'
init()

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <GestureHandlerRootView style={styles.container}>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <TaskListContainer />
            <StatusBar style="auto" />
          </SafeAreaView>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ApolloProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
