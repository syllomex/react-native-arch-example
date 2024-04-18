import { TaskActionsProvider } from '@/modules/task/actions/providers'
import {
  useCreateTask,
  useDeleteTask,
  useGetTasks,
  useGetTotalTasks,
  useToggleTaskDone,
} from '@/modules/task/interactions'
import { TaskListInterface } from '@/modules/task/interfaces'

export function TaskListContainer() {
  const { tasks, refetch: refetchTasks } = useGetTasks()
  const { tasks: pendingTasks, refetch: refetchPendingTasks } = useGetTasks({
    variables: { filter: { done: false } },
  })
  const { totalTasks } = useGetTotalTasks()
  const toggleTaskDone = useToggleTaskDone()
  const deleteTask = useDeleteTask()
  const createTask = useCreateTask()

  return (
    <>
      <TaskActionsProvider
        actions={{
          refetchTasks,
          toggleTaskDone,
          deleteTask,
          createTask,
        }}
      >
        <TaskListInterface tasks={tasks} totalTasks={totalTasks} />
      </TaskActionsProvider>

      {/* Um container não vai ter vários providers e interfaces, isso é apenas um teste. */}
      <TaskActionsProvider
        actions={{
          refetchTasks: refetchPendingTasks,
          toggleTaskDone,
          deleteTask,
          createTask,
        }}
      >
        <TaskListInterface tasks={pendingTasks} totalTasks={pendingTasks?.length} />
      </TaskActionsProvider>
    </>
  )
}
