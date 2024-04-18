import { Card, Checkbox, Loading } from '@/components/ui'
import { useTaskActions } from '@/modules/task/actions/hooks'
import { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export interface TaskCardComponentProps {
  task: { id: string; title: string; deadline: string; done: boolean }
}

export function TaskCard({ task }: TaskCardComponentProps) {
  const actions = useTaskActions()

  const [toggling, setToggling] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleToggle = (done: boolean) => {
    setToggling(true)
    void actions.toggleTaskDone(task.id, done).finally(() => setToggling(false))
  }

  const handleDelete = () => {
    setDeleting(true)
    void actions.deleteTask?.(task.id).catch(() => setDeleting(false))
  }

  return (
    <Card>
      <View style={{ flexDirection: 'row', columnGap: 8 }}>
        {toggling ? <Loading.Small /> : <Checkbox value={task.done} onChange={handleToggle} />}
        <Text style={{ flex: 1 }}>{task.title}</Text>
        {actions.deleteTask != null && (
          <TouchableOpacity onPress={handleDelete} disabled={deleting}>
            {deleting ? (
              <Text style={{ color: '#666' }}>Excluindo</Text>
            ) : (
              <Text style={{ color: 'red' }}>Excluir</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </Card>
  )
}
