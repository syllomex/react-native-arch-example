import type * as Types from '../../../graphql/types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateTaskByIdMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  data: Types.UpdateTaskInput;
}>;


export type UpdateTaskByIdMutation = { __typename?: 'Mutation', updateTaskById: { __typename?: 'Task', id: string, title: string, description?: string | null, done: boolean, deadline: string } };


export const UpdateTaskByIdDocument = gql`
    mutation UpdateTaskById($id: String!, $data: UpdateTaskInput!) {
  updateTaskById(id: $id, data: $data) {
    id
    title
    description
    done
    deadline
  }
}
    `;
export type UpdateTaskByIdMutationFn = Apollo.MutationFunction<UpdateTaskByIdMutation, UpdateTaskByIdMutationVariables>;

/**
 * __useUpdateTaskByIdMutation__
 *
 * To run a mutation, you first call `useUpdateTaskByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskByIdMutation, { data, loading, error }] = useUpdateTaskByIdMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateTaskByIdMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskByIdMutation, UpdateTaskByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskByIdMutation, UpdateTaskByIdMutationVariables>(UpdateTaskByIdDocument, options);
      }
export type UpdateTaskByIdMutationHookResult = ReturnType<typeof useUpdateTaskByIdMutation>;
export type UpdateTaskByIdMutationResult = Apollo.MutationResult<UpdateTaskByIdMutation>;
export type UpdateTaskByIdMutationOptions = Apollo.BaseMutationOptions<UpdateTaskByIdMutation, UpdateTaskByIdMutationVariables>;