// var toPdf = require("office-to-pdf");
var fs = require('fs');
const winax = require('winax');
const path = require('path')
// 转换word为PDF
async function wordToPdf(filepath, outputPath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, async function (err, result) {
            if (err) {
                console.log(err);
                reject();
            } else {
                try {
                    // 创建一个 Word 应用程序对象
                    const word = new winax.Object('Word.Application');
                    // 设置 Word 应用程序为不可见
                    word.Visible = false;
                    // 打开输入的 Word 文件
                    const document = word.Documents.Open(filepath);
                    // 保存为 PDF 格式（FileFormat 17 是 PDF）
                    document.SaveAs(outputPath, 17);
                    // 关闭文档
                    document.Close();
                    word.Quit();
                    console.log(`成功将 ${filepath} 转换为 ${outputPath}`);
                    resolve();
                } catch (err) {
                    console.error('转换失败:', err);
                    reject();
                }
                /*
                下面是使用libreoffice转pdf，但是格式存在问题

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
                */
            }
        });
    })

}

module.exports = wordToPdf