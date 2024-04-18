import { type CodegenConfig } from '@graphql-codegen/cli'
import { type NearOperationFileConfig } from '@graphql-codegen/near-operation-file-preset'
import { type TypeScriptPluginConfig } from '@graphql-codegen/typescript'
import { type TypeScriptDocumentsPluginConfig } from '@graphql-codegen/typescript-operations'
import { type ReactApolloRawPluginConfig } from '@graphql-codegen/typescript-react-apollo/typings/config'

const config: CodegenConfig = {
  schema: 'http://localhost:3000',
  config: {
    useTypeImports: true,
  },
  generates: {
    'src/graphql/types.generated.ts': {
      plugins: ['typescript'],
    },
    'src/': {
      preset: 'near-operation-file-preset',
      plugins: ['typescript-operations', 'typescript-react-apollo'],
      presetConfig: {
        baseTypesPath: 'graphql/types.generated.ts',
        extension: '.generated.tsx',
      } satisfies NearOperationFileConfig,
      documents: ['src/**/*.gql'],
      config: {
        enumsAsTypes: true,
      } satisfies TypeScriptDocumentsPluginConfig &
        TypeScriptPluginConfig &
        ReactApolloRawPluginConfig,
    },
  },
}

export default config
