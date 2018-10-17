let fs = require('fs'),
        PDFParser = require("pdf2json");

let pdfParser = new PDFParser();

pdfParser.on("pdfParser_dataError", errData => {
    console.log(errData.parserError);
});

pdfParser.on("pdfParser_dataReady", pdfData => {
    const pageCount = pdfData.formImage.Pages.length;
    console.log('Total page count: ' + pageCount);

    const page1 = pdfData.formImage.Pages[0];
    const inputFields = page1.Fields;
    console.log('Page 1 input fields count: ' + inputFields.length);

    const filledInputFields = inputFields.filter((field) => {
        return field.V !== undefined;
    });
    console.log("Filled input fields\n========================");
    console.log(filledInputFields);

    const textBlocks = page1.Texts;
    const textBlockValues = textBlocks.map((text) => {
        if(text.R[0].T !== undefined) return text.R[0].T;
    });
    const joinedTexts = textBlockValues.join("|||");
    console.log(joinedTexts);

    const searchValue = "Department%20of%20the%20Treasury%E2%80%94Internal%20Revenue%20Service";
    const desiredTextExists = joinedTexts.includes(searchValue);
    console.log("Text contains desired string: " + desiredTextExists);
});

pdfParser.loadPDF("./f1040ez.pdf");