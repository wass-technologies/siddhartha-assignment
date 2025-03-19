import PDFDocument from 'pdfkit';

const paperSizeHeight = 841.89;
const paperSizeWidth = 595.28;
const paperMargin = 30;

export async function createSchoolTable(schools) {
  const PDFDocument = require('pdfkit');
  let doc = new PDFDocument({
    size: [paperSizeWidth, paperSizeHeight],
    margin: paperMargin,
  });

  generateHeader(doc, schools);
  generateFooter(doc);

  return doc;
}

function generateHeader(doc, schools) {
  doc.fontSize(25).text('School List', { align: 'center' });

  // Table column and width
  const tableColumns = ['School Name', 'Address', 'Status'];
  const columnWidths = [200, 150, 100];

  // Map school data to table rows
  const tableRows = schools.map((school) => [
    school.schoolName,
    school.address1|| 'N/A',
    school.status,
  ]);
// Define the starting point of the table
  const startX = 50;// Reduced left margin
  let startY = 90;
  const padding = 5;

 
  const drawTableHeader = () => {
    doc.fontSize(12).fillColor('white');
    tableColumns.forEach((header, i) => {
      const colWidth = columnWidths[i];
      doc
        .rect(startX + columnWidths.slice(0, i).reduce((a, b) => a + b, 0), startY, colWidth, 25)
        .fill('#333333');
      doc.fillColor('white').text(
        header,
        startX + columnWidths.slice(0, i).reduce((a, b) => a + b, 0) + padding,
        startY + 7,
        { width: colWidth - 2 * padding, align: 'left' },
      );
      doc.fillColor('black'); // Reset color for text
    });
    startY += 25; // Move startY down after the headers
  };

   // Draw the initial table header

  drawTableHeader();
  // Draw the table rows with dynamic height and borders
  tableRows.forEach((row, rowIndex) => {
    if (rowIndex > 0 && rowIndex % 15 === 0) {
      doc.addPage();
      startY = 90;
      drawTableHeader();
    }

      // Calculate the maximum height needed for the current row

    let maxHeight = 0;
    row.forEach((cell, i) => {
      const colWidth = columnWidths[i];
      const cellHeight = doc.heightOfString(cell, {
        width: colWidth - 2 * padding,
        align: 'left',
      });
      maxHeight = Math.max(maxHeight, cellHeight);
    });
    // Draw the cells
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
  const footerText = 'This is a system-generated report.';
  const footerHeight = 20;
  const footerY = doc.page.height - doc.page.margins.bottom - footerHeight;

  doc.fontSize(10).text(footerText, doc.page.margins.left, footerY, {
    width: doc.page.width - doc.page.margins.left - doc.page.margins.right,
    align: 'center',
  });
}
