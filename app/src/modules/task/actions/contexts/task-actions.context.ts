import {
  type useCreateTask,
  type useDeleteTask,
  type useToggleTaskDone,
} from '@/modules/task/interactions'
import { createContext } from 'react'

export interface TaskActions {
  refetchTasks: () => Promise<any>
  toggleTaskDone: ReturnType<typeof useToggleTaskDone>
  deleteTask: ReturnType<typeof useDeleteTask>
  createTask: ReturnType<typeof useCreateTask>
}

export const TaskActionsContext = createContext<TaskActions | null>(null)
