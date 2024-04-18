import { TaskActionsContext } from '@/modules/task/actions/contexts'
import { useContext } from 'react'

export const useTaskActions = () => {
  const actions = useContext(TaskActionsContext)
  if (actions == null) {
    throw new Error('useTaskActions must be called within TaskActionsProvider scope')
  }
  return actions
}
