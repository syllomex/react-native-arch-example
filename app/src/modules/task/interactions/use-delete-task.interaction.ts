import { deletedTask } from '@/events'
import { useDeleteTaskByIdMutation } from '@/modules/task/operations'

export const useDeleteTask = () => {
  const [deleteTaskById] = useDeleteTaskByIdMutation()

  return async (id: string) => {
    await deleteTaskById({ variables: { id } })
    void deletedTask.emit({ id })
  }
}
