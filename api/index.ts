import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { randomUUID } from 'crypto'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { setTimeout } from 'timers/promises'

type Task = {
  id: string
  title: string
  deadline: string
  done: boolean
  description: string | null
}

class Database {
  private _tasks: Task[] = []

  set tasks(value: Task[]) {
    this._tasks = value
    this.persist()
  }

  get tasks() {
    return this._tasks
  }

  constructor() {
    const json = readFileSync(resolve(__dirname, 'db.json')).toString()
    const data = JSON.parse(json)
    this._tasks = data.tasks
  }

  private persist() {
    writeFileSync(resolve(__dirname, 'db.json'), JSON.stringify({ tasks: this._tasks }, null, 2))
  }
}

const database = new Database()

const typeDefs = `#graphql
  type Task {
    id: String!
    title: String!
    description: String
    deadline: String!
    done: Boolean!
  }

  input DateFilterInput {
    since: String
    until: String
  }

  input TaskFilterInput {
    done: Boolean
    deadline: DateFilterInput
    title: String
  }

  input CreateTaskInput {
    title: String!
    deadline: String!
    description: String
  }

  input UpdateTaskInput {
    title: String
    deadline: String
    done: Boolean
    description: String
  }

  type Query {
    tasks(filter: TaskFilterInput, limit: Int, offset: Int): [Task!]!
    taskById(id: String!): Task!
    totalTasks: Int!
  }

  type Mutation {
    createTask(data: CreateTaskInput!): Task!
    updateTaskById(id: String!, data: UpdateTaskInput!): Task!
    deleteTaskById(id: String!): Boolean!
  }
`

type QueryTasksArgs = {
  filter?: {
    title?: string
    done?: boolean
    deadline?: {
      since?: string
      until?: string
    }
  }
  limit?: number
  offset?: number
}

type QueryTaskByIdArgs = {
  id: string
}

type MutationCreateTaskArgs = {
  data: {
    title: string
    deadline: string
    description?: string | null
  }
}

type MutationUpdateTaskByIdArgs = {
  id: string
  data: {
    title?: string
    deadline?: string
    done?: boolean
    description?: string | null
  }
}

type MutationDeleteTaskByIdArgs = {
  id: string
}

const resolvers = {
  Query: {
    tasks: (_: unknown, args: QueryTasksArgs) => {
      const tasks = [...database.tasks]

      const paginated = args.limit != null ? tasks.splice(args.offset ?? 0, args.limit) : tasks

      const filtered = args.filter
        ? paginated.filter(task => {
            if (typeof args.filter?.done === 'boolean' && args.filter.done !== task.done) return false

            if (
              typeof args.filter?.title === 'string' &&
              !task.title.toLowerCase().includes(args.filter.title.toLowerCase())
            )
              return false

            if (args.filter?.deadline != null) {
              if (args.filter.deadline.since && task.deadline < args.filter.deadline.since) return false
              if (args.filter.deadline.until && task.deadline > args.filter.deadline.until) return false
            }

            return true
          })
        : paginated

      return filtered
    },

    taskById: (_: unknown, args: QueryTaskByIdArgs) => {
      const task = database.tasks.find(({ id }) => id === args.id)
      if (!task) throw new Error('Tarefa não encontrada.')
      return task
    },

    totalTasks: () => {
      return database.tasks.length
    },
  },
  Mutation: {
    createTask: (_: unknown, args: MutationCreateTaskArgs) => {
      const task = {
        ...args.data,
        id: randomUUID(),
        done: false,
        description: args.data.description !== undefined ? args.data.description : null,
      }
      database.tasks = [...database.tasks, task]
      return task
    },

    updateTaskById: (_: unknown, args: MutationUpdateTaskByIdArgs) => {
      const index = database.tasks.findIndex(task => task.id === args.id)
      if (index === -1) throw new Error('Tarefa não encontrada.')
      const currentTask = database.tasks[index]

      currentTask.done = args.data.done ?? currentTask.done
      currentTask.deadline = args.data.deadline ?? currentTask.deadline
      currentTask.title = args.data.title ?? currentTask.title
      if (args.data.description !== undefined) currentTask.description = args.data.description

      database.tasks = [...[...database.tasks].splice(0, index), currentTask, ...[...database.tasks].splice(index + 1)]

      return currentTask
    },

    deleteTaskById: (_: unknown, args: MutationDeleteTaskByIdArgs) => {
      const index = database.tasks.findIndex(task => task.id === args.id)
      if (index === -1) throw new Error('Tarefa não encontrada.')
      database.tasks = database.tasks.filter(task => task.id !== args.id)
      return true
    },
  },
}

const dateFormatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'medium' })

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    {
      requestDidStart: async ctx => {
        console.log(`${dateFormatter.format(new Date())} Request received: ${ctx.request.operationName}`)
        await setTimeout(200)
      },
    },
  ],
})

startStandaloneServer(server, { listen: { port: 3000 } }).then(({ url }) => console.log(`🚀 GraphQL running on ${url}`))
