import * as fs from 'fs';
import * as path from 'path';
import * as ExcelJS from 'exceljs'

import { Student, Sheet } from './student';

const template = "./data/template.csv"
const folderOfFiles = "./data";

async function grabData(sheet: Sheet) {
  for (const stud of sheet.students) {
    let fileToFind = path.join(folderOfFiles, `${stud.fullName}.xlsx`)
    
    const workbook = await new ExcelJS.Workbook().xlsx.readFile(fileToFind)
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

const students = resultsNeeded(template)
grabData(students)

