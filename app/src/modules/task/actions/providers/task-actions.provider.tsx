import { TaskActionsContext, type TaskActions } from '@/modules/task/actions/contexts'
import { type PropsWithChildren } from '@/types/react'

interface Props {
  actions: TaskActions
}

export function TaskActionsProvider({ children, actions }: PropsWithChildren<Props>) {
  return <TaskActionsContext.Provider value={actions}>{children}</TaskActionsContext.Provider>
}
