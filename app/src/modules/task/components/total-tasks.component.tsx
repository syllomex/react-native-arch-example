import { Text } from 'react-native'

interface Props {
  data: {
    totalTasks: number
  }
}

export function TotalTasks({ data }: Props) {
  return (
    <>
      <Text>{data.totalTasks} tarefas</Text>
    </>
  )
}
