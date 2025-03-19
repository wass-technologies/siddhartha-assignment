"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTable = createTable;
const pdfkit_1 = __importDefault(require("pdfkit"));
const paperSizeHeight = 841.89;
const paperSizeWidth = 595.28;
const paperMargin = 30;
async function createTable(invoice) {
    let doc = new pdfkit_1.default({
        size: [paperSizeWidth, paperSizeHeight],
        margin: paperMargin,
    });
    generateHeader(doc, invoice, 50);
    generateFooter(doc);
    return doc;
}
function generateHeader(doc, invoice, customerInformationTop) {
    doc.fontSize(25).text('Leads List', {
        align: 'center',
    });
    const tableColumns = [
        'Name',
        'Enquiry For',
        'Contact No.',
        'WhatsApp',
        'Location',
        'Status',
        'Date',
    ];
    const columnWidths = [80, 80, 80, 80, 100, 50, 70];
    const tableRows = invoice.map((item) => [
        item.name,
        item.enquiryFor,
        item.contactNumber,
        item.wpNo,
        item.location || 'N/A',
        item.status,
        formatDate(item.createdAt),
    ]);
    const startX = 27;
    let startY = 90;
    const padding = 5;
    let rowIndex = 0;
    const drawTableHeader = () => {
        doc.fontSize(12).fillColor('white');
        tableColumns.forEach((header, i) => {
            const colWidth = columnWidths[i];
            doc
                .rect(startX + columnWidths.slice(0, i).reduce((a, b) => a + b, 0), startY, colWidth, 25)
                .fill('#333333');
            doc
                .fillColor('white')
                .text(header, startX +
                columnWidths.slice(0, i).reduce((a, b) => a + b, 0) +
                padding, startY + 7, { width: colWidth - 2 * padding, align: 'left' });
            doc.fillColor('black');
        });
        startY += 25;
    };
    drawTableHeader();
    tableRows.forEach((row, rowIndex) => {
        if (rowIndex > 0 && rowIndex % 15 === 0) {
            doc.addPage();
            startY = 90;
            drawTableHeader();
        }
        let maxHeight = 0;
        row.forEach((cell, i) => {
            const colWidth = columnWidths[i];
            const cellHeight = doc.heightOfString(cell, {
                width: colWidth - 2 * padding,
                align: 'left',
            });
            maxHeight = Math.max(maxHeight, cellHeight);
        });
        row.forEach((cell, i) => {
            const colWidth = columnWidths[i];
            const cellX = startX + columnWidths.slice(0, i).reduce((a, b) => a + b, 0);
            doc.rect(cellX, startY, colWidth, maxHeight + 2 * padding).stroke();
            doc.text(cell, cellX + padding, startY + padding, {
                width: colWidth - 2 * padding,
                align: 'left',
            });
        });
        startY += maxHeight + 2 * padding;
    });
}
function generateFooter(doc) {
    const footerText = 'This is system generated Lead. All rights reserved to /APP NAME/';
    const footerHeight = 20;
    const footerY = doc.page.height - doc.page.margins.bottom - footerHeight;
    doc.fontSize(10).text(footerText, doc.page.margins.left, footerY, {
        width: doc.page.width - doc.page.margins.left - doc.page.margins.right,
        align: 'center',
    });
}
function generateHr(doc, y) {
    doc
        .strokeColor('#aaaaaa')
        .lineWidth(1)
        .moveTo(paperMargin, y)
        .lineTo(paperSizeWidth - paperMargin, y)
        .stroke();
}
function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return year + '/' + month + '/' + day;
}
//# sourceMappingURL=createTable.utils.js.map