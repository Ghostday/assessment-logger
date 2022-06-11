import fs from 'fs';
import path from 'path';
import ExcelJS from 'exceljs'

import { filesWanted } from './utils';
import {Student} from './student';

const folderOfFiles = "./data";

async function grabData(folder: string) {
  let files = filesWanted(folder);
  files.forEach(async (file: string) => {
    let studName = file.split("\\")[1]
    studName = studName.substring(0, studName.length - 5)

    let stud = new Student('blah', studName, "yo")

    const workbook = await new ExcelJS.Workbook().xlsx.readFile(file)
    const sheet = workbook.getWorksheet("Summary")
    const rows = sheet.findRows(3, 10)
    const colCount = sheet.actualColumnCount

    rows!.forEach(row => {
      let skill = row.values[1]
      for (let i = 2; i <= colCount; i++) {
        if (row.values[i].result) {
          let result = row.values[i].result
          let weekNo = (i-1) * 2
          
          console.log(stud)
          console.log(skill, weekNo, row.values[i].result)

        }
      }
    })

    // grabResults(sheet)
  })
}



function grabResults(sheet) {
  sheet.findRows(3, 10).forEach(row => {
    let bsm = row.values[1]
    
  
  })
  

}

grabData(folderOfFiles)

