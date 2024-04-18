import type * as Types from '../../../graphql/types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteTaskByIdMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type DeleteTaskByIdMutation = { __typename?: 'Mutation', deleteTaskById: boolean };


export const DeleteTaskByIdDocument = gql`
    mutation DeleteTaskById($id: String!) {
  deleteTaskById(id: $id)
}
    `;
export type DeleteTaskByIdMutationFn = Apollo.MutationFunction<DeleteTaskByIdMutation, DeleteTaskByIdMutationVariables>;

/**
 * __useDeleteTaskByIdMutation__
 *
 * To run a mutation, you first call `useDeleteTaskByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskByIdMutation, { data, loading, error }] = useDeleteTaskByIdMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTaskByIdMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTaskByIdMutation, DeleteTaskByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTaskByIdMutation, DeleteTaskByIdMutationVariables>(DeleteTaskByIdDocument, options);
      }
export type DeleteTaskByIdMutationHookResult = ReturnType<typeof useDeleteTaskByIdMutation>;
export type DeleteTaskByIdMutationResult = Apollo.MutationResult<DeleteTaskByIdMutation>;
export type DeleteTaskByIdMutationOptions = Apollo.BaseMutationOptions<DeleteTaskByIdMutation, DeleteTaskByIdMutationVariables>;