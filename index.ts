const fs = require('fs')
const path = require ('path')
const exceljs = require('exceljs')

const folderOfFiles = ""

const isSheet = (file: string) => {
    if (fs.lstatSync(file).isFile() && file.endsWith('.xlsx')) {
        return true
    }
}

const filesWanted = function (folderPath: string) {
    let files = fs.readdirSync(folderPath).map((filename: string) => {
        return path.join(folderPath, filename)
    }).filter(isSheet)
}