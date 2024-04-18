import { createdTask, deletedTask, loadedAllTasks } from '@/events'
import { useGetTasksQuery } from '@/modules/task/operations'
import { useEffect } from 'react'

export const useGetTasks = (options?: Parameters<typeof useGetTasksQuery>['0']) => {
  const query = useGetTasksQuery({
    ...options,
    notifyOnNetworkStatusChange: true,
    onCompleted: data => {
      options?.onCompleted?.(data)
      void loadedAllTasks.emit(data.tasks)
    },
  })

  useEffect(() => {
    // @TODO: use same filter to deleted tasks
    deletedTask.subscribe('useGetTasks', async ({ id }) => {
      query.updateQuery(prev => ({ ...prev, tasks: prev.tasks.filter(task => task.id !== id) }))
    })

    // Essa parte de filtros também é um teste. Ignorar por enquanto
    if (query.variables?.filter != null) {
      const key = `useGetTasks/${JSON.stringify(query.variables.filter)}`

      createdTask.subscribe(key, async task => {
        const validSince =
          query.variables?.filter?.deadline?.since == null ||
          task.deadline >= query.variables.filter.deadline.since

        const validUntil =
          query.variables?.filter?.deadline?.until == null ||
          task.deadline <= query.variables.filter.deadline.until

        const validDone =
          query.variables?.filter?.done == null || task.done === query.variables.filter.done

        if (validSince && validUntil && validDone) {
          query.updateQuery(prev => ({ ...prev, tasks: [...prev.tasks, task] }))
        }
      })

      // @TODO: subscribe to updatedTask
    } else {
      createdTask.subscribe('useGetTasks', async task => {
        query.updateQuery(prev => ({ ...prev, tasks: [...prev.tasks, task] }))
      })
    }
  }, [query])

  return {
    tasks: query.data?.tasks,
    refetch: query.refetch,
  }
}
