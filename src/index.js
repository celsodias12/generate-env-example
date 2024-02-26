#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

const regex = /(?<==).*/g

const fileName = process.argv?.[2] || '.env'

const envPath = path.join(process.cwd(), fileName)

const bufferEncoding = 'utf8'

function run() {
  if (fs.existsSync(envPath)) {
    fs.readFile(envPath, bufferEncoding, (errorRead, fileData) => {
      if (errorRead) {
        console.log({ errorRead })

        return
      }

      const result = fileData.replace(regex, '')

      fs.writeFile(
        path.join(process.cwd(), `${fileName}.example`),
        result,
        bufferEncoding,
        errorWrite => {
          if (errorWrite) {
            console.log({ errorWrite })

            return
          }

          console.log(`\nSuccessfully created ${fileName}.example`)
        }
      )
    })
  } else {
    console.log(`\nNo ${fileName} file found`)
  }
}

run()
