const PDFJS = require('pdfjs-dist');

var PDF_URL  = 'f1040ez.pdf';

function getPageText(pageNum, PDFDocumentInstance) {
    // Return a Promise that is solved once the text of the page is retrieven
    return new Promise(function (resolve, reject) {
        PDFDocumentInstance.getPage(pageNum).then(function (pdfPage) {
            // The main trick to obtain the text of the PDF page, use the getTextContent method
            pdfPage.getTextContent().then(function (textContent) {
                var textItems = textContent.items;
                var finalString = "";

                // Concatenate the string of the item to the final string
                for (var i = 0; i < textItems.length; i++) {
                    var item = textItems[i];

                    finalString += item.str + " ";
                }

                // Solve promise with the text retrieven from the page
                resolve(finalString);
            });

            pdfPage.getAnnotations().then((content) => {
                const foundSomebody = content.filter((item) => { 
                    return item.fieldValue === 'Somebody';
                });
                console.log(foundSomebody);
                console.log(foundSomebody.length);
                console.log('Found somebody only: ' + (foundSomebody.length === 1));
            });
        });
    });
}

PDFJS.getDocument(PDF_URL).then(function (PDFDocumentInstance) {
    
    var totalPages = PDFDocumentInstance.pdfInfo.numPages;
    var pageNumber = 1;

    // Extract the text
    getPageText(pageNumber , PDFDocumentInstance)
    .then(function(textPage){
        // Show the text of the page in the console
        // console.log(textPage);
    });

}, function (reason) {
    // PDF loading error
    console.error(reason);
})
.catch(error => {
    console.log(error);
});