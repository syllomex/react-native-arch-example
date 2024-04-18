import { Container, Loading, Modal } from '@/components/ui'
import { useTaskActions } from '@/modules/task/actions/hooks'
import { TaskCard, TaskFormComponent, TotalTasks } from '@/modules/task/components'
import { useState } from 'react'
import { FlatList, Text, TouchableOpacity } from 'react-native'

export interface TaskListInterfaceProps {
  tasks?: Array<{ id: string; title: string; done: boolean; deadline: string }>
  totalTasks?: number
}

export function TaskListInterface({ tasks, totalTasks }: TaskListInterfaceProps) {
  const [refreshing, setRefreshing] = useState(false)
  const [shouldMountOptions, setShouldMountOptions] = useState(true)
  const [createTaskOpen, setCreateTaskOpen] = useState(false)
  const actions = useTaskActions()

  const handleRefresh = () => {
    setRefreshing(true)
    void actions.refetchTasks().finally(() => setRefreshing(false))
  }

  const handleCreate = async (data: { title: string }) => {
    await actions.createTask(data)
    setCreateTaskOpen(false)
  }

  return (
    <Container>
      <TouchableOpacity onPress={() => setShouldMountOptions(cur => !cur)}>
        {shouldMountOptions ? <Text>Desmontar</Text> : <Text>Montar</Text>}
      </TouchableOpacity>

      {shouldMountOptions && totalTasks != null && <TotalTasks data={{ totalTasks }} />}

      <Modal open={createTaskOpen} setOpen={setCreateTaskOpen}>
        <Modal.Content>
          <Modal.Title>Nova tarefa</Modal.Title>
          <TaskFormComponent onSubmit={handleCreate} />
        </Modal.Content>

        <Modal.Toggle>
          <Text>Nova tarefa</Text>
        </Modal.Toggle>
      </Modal>

      <FlatList
        data={tasks}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <TaskCard task={item} />}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        ListEmptyComponent={tasks == null ? <Loading /> : null}
      />
    </Container>
  )
}
