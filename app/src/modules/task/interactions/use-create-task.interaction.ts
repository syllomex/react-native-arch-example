import { createdTask } from '@/events'
import { useCreateTaskMutation } from '@/modules/task/operations'

export const useCreateTask = () => {
  const [createTask] = useCreateTaskMutation()

  return async (data: { title: string }) => {
    const now = new Date()
    const deadline = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate()}`
    const result = await createTask({ variables: { data: { title: data.title, deadline } } })
    if (result.data != null) void createdTask.emit(result.data?.createTask)
  }
}
