import * as fs from 'fs';
import * as path from 'path';
import * as ExcelJS from 'exceljs'
const prompt = require('prompt-sync')();

import { Student, Sheet } from './student';

const template = "./data/template.csv"
const folderOfFiles = "./data";

async function grabData(sheet: Sheet) {
  process.stdout.write('Loading...\n')
  for (const stud of sheet.students) {
    const fileToFind = path.join(folderOfFiles, `${stud.fullName}.xlsx`)
    const workbook = await new ExcelJS.Workbook().xlsx.readFile(fileToFind)
    process.stdout.write(`Found ${fileToFind}\n`)

    const workSheet = workbook.getWorksheet("Summary")
    const rows = workSheet.findRows(3, 10)
    const colCount = workSheet.actualColumnCount

    rows!.forEach(row => {
      let skill = row.values[1]
      for (let i = 2; i <= colCount; i++) {
        if (row.values[i].result) {
          let result = row.values[i].result
          let weekNo = (i - 1) * 2
          let assessmentLine = `Week ${weekNo} - Soft Skills - ${skill}`
          stud.addLine(assessmentLine, result)
          console.log(skill, weekNo, row.values[i].result)
        }
      }
    })
  }

  exportCSV(sheet)
}

function resultsNeeded(file: string) {
  let sheet = new Sheet()
  const contents = fs.readFileSync(file).toLocaleString().split('\n')
  contents.forEach(line => {
    if (line.startsWith('a1g')) {
      sheet.newStudent(line)
    }
  })
  return sheet
}

function exportCSV(sheet) {
  fs.writeFile('./test.csv', sheet.finalizeLines(), function (err) {
    if (err) {
      console.log(err)
    }
    else {
      console.log('done')
    }
  })
}


const students = resultsNeeded(template)
grabData(students)
