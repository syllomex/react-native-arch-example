import { Observable } from '@/events/_observable'

class DeletedTask extends Observable<{ id: string }> {
  name = 'deletedTask'
}

export const deletedTask = new DeletedTask()
