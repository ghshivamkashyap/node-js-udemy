const fs = require("fs");
const path = require("path");
const PDF = require("pdfkit");

exports.uploadFile = async (req, res, next) => {
  console.log("Req file: ", req.file);

  const fixedFilePath = req.file.path.replace(/\\/g, "/");

  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;

  return res.status(200).json({
    success: true,
    data: req.body,
    url: fileUrl,
  });
};

exports.getFile = async (req, res, next) => {
  const filePath = path.join(
    __dirname,
    "../uploads/1726387794965_uploadScheduleSample.xlsx"
  );
  const uri = "http://localhost:4000/uploads/1726383290515_udemy_flutetr.pdf";

  // static file load at opnce insted of creating a stream  very heavy operation for large files to server insted use down approact fd creating a stream
  // fs.access(filePath, fs.constants.F_OK, (err) => {
  //   if (err) {
  //     return res
  //       .status(404)
  //       .json({ success: false, message: "File not found" });
  //   }
  //   // res.setHeader("Content-Type", "application/pdf");
  //   // Send the file as a response
  //   console.log("filePath: ", filePath);
  //   return res.sendFile(filePath);
  // });

  const file = fs.createReadStream(filePath);

  file.pipe(res);
};

exports.getGeneratedPdf = async (req, res, next) => {
  const file = new PDF();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'inline; filename="invoice.pdf"');

  // Pipe the PDF stream to the response
  file.pipe(res);

  // Add invoice title
  file.fontSize(20).text("Invoice", { align: "center" });

  // Add some spacing
  file.moveDown();

  // Add random invoice data
  file.fontSize(12).text("Invoice Number: INV-12345", { align: "left" });
  file.text("Date: 15th September 2024", { align: "left" });
  file.text("Customer Name: John Doe", { align: "left" });
  file.text("Customer Address: 123 Main Street, Cityville, USA", {
    align: "left",
  });

  // Add some spacing
  file.moveDown();

  // Table header
  file.fontSize(14).text("Items", { underline: true });
  file.text("----------------------------------------------");
  file
    .fontSize(12)
    .text("Item Name          |   Quantity   |   Price   |   Total");
  file.text("----------------------------------------------");

  // Random items
  file.text("Product A           |   2              |   $50      |   $100");
  file.text("Product B           |   1              |   $80      |   $80");
  file.text("Product C           |   5              |   $10      |   $50");
  file.text("----------------------------------------------");

  // Total amount
  file.fontSize(14).text("Total Amount: $230", { align: "right" });

  // Add a footer
  file.moveDown();
  file.fontSize(10).text("Thank you for your purchase!", { align: "center" });

  // Finalize the PDF file
  file.end();
};
