import { useUpdateTaskByIdMutation } from '@/modules/task/operations'

export function useToggleTaskDone() {
  const [updateTask] = useUpdateTaskByIdMutation()

  return async (id: string, done: boolean) => {
    await updateTask({ variables: { id, data: { done } } })
  }
}
