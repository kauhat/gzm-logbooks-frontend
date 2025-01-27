import type {
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxCollection,
  RxDocument,
  RxJsonSchema,
} from 'rxdb'
import { toTypedRxJsonSchema } from 'rxdb'

export const logbookSchemaLiteral = {
  title: 'logbook',
  type: 'object',
  primaryKey: 'id',
  version: 3,
  properties: {
    id: {
      type: 'string',
      maxLength: 100,
      final: true,
    },
    name: {
      type: 'string',
      maxLength: 100,
    },
  },
  required: ['id', 'name'],
  // indexes: []
} as const

const schemaTyped = toTypedRxJsonSchema(logbookSchemaLiteral)

// aggregate the document type from the schema
export type LogbookDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof schemaTyped
>

// create the typed RxJsonSchema from the literal typed object.
export const logbookSchema: RxJsonSchema<LogbookDocType> = logbookSchemaLiteral

export type LogbookDocMethods = {
  scream: (v: string) => string
  getRoute: () => object
  getNewEntryRoute: () => object
}

export type LogbookDocument = RxDocument<LogbookDocType, LogbookDocMethods>

// we declare one static ORM-method for the collection
export type LogbookCollectionMethods = {
  countAllDocuments: () => Promise<number>
}

// and then merge all our types
export type LogbookCollection = RxCollection<
  LogbookDocType,
  LogbookDocMethods,
  LogbookCollectionMethods
>
