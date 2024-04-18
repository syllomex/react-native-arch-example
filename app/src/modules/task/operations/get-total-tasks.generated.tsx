import type * as Types from '../../../graphql/types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetTotalTasksQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetTotalTasksQuery = { __typename?: 'Query', totalTasks: number };


export const GetTotalTasksDocument = gql`
    query GetTotalTasks {
  totalTasks
}
    `;

/**
 * __useGetTotalTasksQuery__
 *
 * To run a query within a React component, call `useGetTotalTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTotalTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTotalTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTotalTasksQuery(baseOptions?: Apollo.QueryHookOptions<GetTotalTasksQuery, GetTotalTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTotalTasksQuery, GetTotalTasksQueryVariables>(GetTotalTasksDocument, options);
      }
export function useGetTotalTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTotalTasksQuery, GetTotalTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTotalTasksQuery, GetTotalTasksQueryVariables>(GetTotalTasksDocument, options);
        }
export function useGetTotalTasksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTotalTasksQuery, GetTotalTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTotalTasksQuery, GetTotalTasksQueryVariables>(GetTotalTasksDocument, options);
        }
export type GetTotalTasksQueryHookResult = ReturnType<typeof useGetTotalTasksQuery>;
export type GetTotalTasksLazyQueryHookResult = ReturnType<typeof useGetTotalTasksLazyQuery>;
export type GetTotalTasksSuspenseQueryHookResult = ReturnType<typeof useGetTotalTasksSuspenseQuery>;
export type GetTotalTasksQueryResult = Apollo.QueryResult<GetTotalTasksQuery, GetTotalTasksQueryVariables>;