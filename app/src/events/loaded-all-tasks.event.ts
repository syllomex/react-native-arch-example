import { Observable } from '@/events/_observable'

class LoadedAllTasks extends Observable<Array<{ id: string }>> {
  name = 'loadedAllTasks'
}

export const loadedAllTasks = new LoadedAllTasks()
