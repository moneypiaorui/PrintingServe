const path = require('path');
const printer = require('pdf-to-printer');
const express = require('express');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs').promises;
const printRouter = express.Router();
const authMiddleware = require('../components/authMiddleware');



// 处理打印操作的路由
printRouter.post('/', authMiddleware, (req, res) => {
    const { filename ,timestamp} = req.body;
    const completeFilename = `${timestamp}-${filename}`;
    // 执行打印操作的逻辑
    if (filename) {
        const filePath = path.join(__dirname, '../uploads', completeFilename);

        printer
            .print(filePath, {
                printDialog: 0,
                monochrome: 1,//黑白打印
                copies: 1
            })
            .then(() => {
                console.log(`文件${completeFilename}已打印`);
                if (path.extname(filename) == ".pdf") {
                    getPageCount(filePath)
                        .then(pageCount => {
                            // console.log(`${pageCount}`);
                            res.status(200).json({ message: '文件已发送到打印机进行打印', pages: pageCount });
                        })
                        .catch(err => {
                            res.status(200).json({ message: '文件已发送到打印机进行打印', err: "获取pdf页数时出错", pages: 0 });
                            console.error('获取 PDF 文件页数时出错：', err);
                        });
                } else {
                    res.status(200).json({ message: '文件已发送到打印机进行打印', err: "不是PDF", pages: 1 });
                }

            })
            .catch((err) => {
                console.error('打印失败:', err);
                res.status(500).json({ message: '打印失败' });
            });
    } else {
        res.status(400).send('未选择文件');
    }
});

async function getPageCount(pdfPath) {
    try {
        // 读取 PDF 文件
        const pdfBytes = await fs.readFile(pdfPath);
        // 打开 PDF 文档
        const pdfDoc = await PDFDocument.load(pdfBytes);
        // 获取 PDF 文件的页数
        const pageCount = pdfDoc.getPageCount();
        return pageCount;
    } catch (error) {
        console.error('读取 PDF 文件时出错：', error);
        return 0;
    }
}


module.exports = printRouter;
