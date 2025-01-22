import type {
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxJsonSchema
} from 'rxdb';
import {
  toTypedRxJsonSchema
} from 'rxdb'

export const logbookSchemaLiteral = {
  title: 'logbook',
  type: 'object',
  primaryKey: 'id',
  version: 3,
  properties: {
    id: {
      type: 'string',
      maxLength: 100,
      final: true
    },
    name: {
      type: 'string',
      maxLength: 100
    }
  },
  required: [
    'id',
    'name'
  ],
  // indexes: []
} as const // <- It is important to set 'as const' to preserve the literal type

const schemaTyped = toTypedRxJsonSchema(logbookSchemaLiteral)

// aggregate the document type from the schema
type logbookDocType = ExtractDocumentTypeFromTypedRxJsonSchema<typeof schemaTyped>;

// create the typed RxJsonSchema from the literal typed object.
export const logbookSchema: RxJsonSchema<logbookDocType> = logbookSchemaLiteral
