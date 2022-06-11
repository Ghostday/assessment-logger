const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');
import { filesWanted } from './utils';

const folderOfFiles = "./data";

async function grabSheets(folder) {
  let files = filesWanted(folder);
  files.forEach(file => {
    let studName = file.split("\\")[1]
    studName = studName.substring(0, studName.length - 5)

  })
  const workbook = await new ExcelJS.Workbook().xlsx.readFile(files[0])
  let sheet = workbook.getWorksheet("Summary")
  console.log(sheet)

}

function grabDetails(workbook) {


}



console.log(grabSheets(folderOfFiles))

