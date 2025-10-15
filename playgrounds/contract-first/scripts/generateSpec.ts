import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { OpenAPIGenerator, OpenAPIV3Generator } from '@orpc/openapi'
import { ZodToJsonSchemaConverter } from '@orpc/zod/zod4'
import { contract } from '../src/contract'

const v31 = new OpenAPIGenerator({
  schemaConverters: [new ZodToJsonSchemaConverter()],
})
const v3 = new OpenAPIV3Generator({
  schemaConverters: [new ZodToJsonSchemaConverter()],
})

const specv31 = await v31.generate(contract)
const specv3 = await v3.generate(contract)

writeFileSync(join(import.meta.dirname, './spec-v31.json'), JSON.stringify(specv31))
writeFileSync(join(import.meta.dirname, './spec-v3.json'), JSON.stringify(specv3))
