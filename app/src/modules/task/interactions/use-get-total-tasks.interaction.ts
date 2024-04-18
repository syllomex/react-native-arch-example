import { createdTask, deletedTask, loadedAllTasks } from '@/events'
import { useGetTotalTasksQuery } from '@/modules/task/operations'

import { useEffect } from 'react'

export const useGetTotalTasks = () => {
  const query = useGetTotalTasksQuery()

  useEffect(() => {
    deletedTask.subscribe('useGetTotalTasks', async () => {
      query.updateQuery(cur => ({ ...cur, totalTasks: cur.totalTasks - 1 }))
    })

    loadedAllTasks.subscribe('useGetTotalTasks', async tasks => {
      query.updateQuery(cur => ({ ...cur, totalTasks: tasks.length }))
    })

    createdTask.subscribe('useGetTotalTasks', async () => {
      query.updateQuery(cur => ({ ...cur, totalTasks: cur.totalTasks + 1 }))
    })
  }, [query])

  return { totalTasks: query.data?.totalTasks }
}
