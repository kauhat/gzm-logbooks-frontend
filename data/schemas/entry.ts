import type {
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxJsonSchema
} from 'rxdb';
import {
  toTypedRxJsonSchema
} from 'rxdb'

export const entrySchemaLiteral =
{
  title: 'Entry',
  type: 'object',
  version: 3,
  properties: {
    timestamp: {
      type: 'string',
      minLength: 12,
      maxLength: 100
    },
    logbook: {
      type: 'string',
      ref: 'logbooks',
      minLength: 1,
      maxLength: 100
    },
    amountRed: {
      type: 'number'
    },
    amountAmber: {
      type: 'number'
    },
    amountGreen: {
      type: 'number'
    },
    comment: {
      type: 'string'
    }
  },
  primaryKey: 'timestamp',
  indexes: [
    'logbook'
  ],
  required: [
    'timestamp',
    'logbook'
  ]
} as const // <- It is important to set 'as const' to preserve the literal type

const schemaTyped = toTypedRxJsonSchema(entrySchemaLiteral)

// aggregate the document type from the schema
type entryDocType = ExtractDocumentTypeFromTypedRxJsonSchema<typeof schemaTyped>;

// create the typed RxJsonSchema from the literal typed object.
export const entrySchema: RxJsonSchema<entryDocType> = entrySchemaLiteral
