import {
  toTypedRxJsonSchema,
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxJsonSchema
} from 'rxdb'

export const logbookSchemaLiteral = {
  title: 'logbook',
  type: 'object',
  version: 3,
  properties: {
    name: {
      type: 'string',
      maxLength: 100
    }
  },
  primaryKey: 'name',
  required: [
    'name'
  ],
  indexes: [
  ]
} as const // <- It is important to set 'as const' to preserve the literal type

const schemaTyped = toTypedRxJsonSchema(logbookSchemaLiteral)

// aggregate the document type from the schema
type logbookDocType = ExtractDocumentTypeFromTypedRxJsonSchema<typeof schemaTyped>;

// create the typed RxJsonSchema from the literal typed object.
export const logbookSchema: RxJsonSchema<logbookDocType> = logbookSchemaLiteral
