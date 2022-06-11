const isSheet = function (file) {
    if (fs.lstatSync(file).isFile() && file.endsWith('.xlsx')) {
        return true;
    }
};

export const filesWanted = function (folderPath) {
    const files = fs.readdirSync(folderPath).map(function (filename) {
        return path.join(folderPath, filename);
    }).filter(isSheet);
    return files;
};
