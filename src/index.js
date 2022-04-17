#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

const regex = /(?<==).*/g

const fileName = process.argv?.[2] || '.env'

const envPath = path.join(process.cwd(), fileName)

const bufferEncoding = 'utf8'

if (fs.existsSync(envPath)) {
  fs.readFile(envPath, bufferEncoding, (errorRead, fileData) => {
    if (errorRead) {
      console.log(errorRead)

      return
    }

    const result = fileData.replace(regex, '')

    fs.writeFile(
      path.join(process.cwd(), '.env.example'),
      result,
      bufferEncoding,
      errorWrite => {
        if (errorWrite) {
          console.log(errorWrite)

          return
        }

        console.log('\nSuccessfully created .env.example')
      }
    )
  })
} else {
  console.log(`\nNo ${fileName} file found`)
}
