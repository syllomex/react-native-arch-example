import { Observable } from '@/events/_observable'

class CreatedTask extends Observable<{
  id: string
  title: string
  deadline: string
  done: boolean
}> {
  name = 'createdTask'
}

export const createdTask = new CreatedTask()
