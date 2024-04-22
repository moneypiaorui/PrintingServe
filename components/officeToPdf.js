var toPdf = require("office-to-pdf");
var fs = require('fs');
// 转换word为PDF
async function wordToPdf(filepath, outputPath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, async function (err, result) {
            if (err) {
                console.log(err);
                reject();
            } else {
                await toPdf(result).then(
                    (pdfBuffer) => {
                        fs.writeFileSync(outputPath, pdfBuffer);
                        console.log('成功生成PDF文件')
                        resolve();
                        // sendFileToServer('./pdf/test.pdf' , '/sftp/pdf/test.pdf')
                    }, (err) => {
                        console.log(err);
                        reject();
                    }
                );
            }
        });
    })

}

module.exports = wordToPdf