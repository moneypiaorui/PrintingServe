const Docxtemplater = require('docxtemplater');
const fs = require('fs');
const Printer = require('printer');

// 定义要打印的 .docx 文件路径
const docxFilePath = '/path/to/your/document.docx';

// 读取 .docx 文件内容
const content = fs.readFileSync(docxFilePath, 'binary');

// 使用 docxtemplater 解析 .docx 文件内容
const docx = new Docxtemplater();
docx.loadZip(content);
const data = {
    // 这里可以是你想要替换的内容，例如：
    // name: 'John Doe',
    // age: 30,
    // ...
};
docx.setData(data);
docx.render();

// 获取解析后的内容
const printableContent = docx.getZip().generate({type: 'nodebuffer'});

// 打印解析后的内容
Printer.printDirect({
    data: printableContent,
    printer: 'YourPrinterName',
    type: 'DOCX',
    success: (jobID) => {
        console.log(`Document printed successfully with job ID: ${jobID}`);
    },
    error: (err) => {
        console.error('Error occurred while printing:', err);
    }
});