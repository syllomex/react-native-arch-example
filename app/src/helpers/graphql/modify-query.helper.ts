import { apolloClient } from '@/lib/apollo'
import type { DataProxy } from '@apollo/client'
import type { DocumentNode } from 'graphql'

export function modifyQuery<TResult, TVariables>({
  query,
  variables,
}: {
  query: DocumentNode
  variables?: TVariables
}) {
  return {
    read: (
      options?: Omit<DataProxy.ReadQueryOptions<TResult, TVariables>, 'query' | 'variables'>,
      optimistic?: boolean | undefined,
    ) => apolloClient.readQuery<TResult, TVariables>({ ...options, query, variables }, optimistic),

    write: (
      options: Omit<DataProxy.WriteQueryOptions<TResult, TVariables>, 'query' | 'variables'>,
    ) => apolloClient.writeQuery<TResult, TVariables>({ ...options, query, variables }),
  }
}
