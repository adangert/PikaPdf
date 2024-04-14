// const { app, BrowserWindow } = require('electron')
const { app, BrowserWindow } = require('electron')
const { PDFDocument } = require('electron')
// const { BrowserWindow } = require('electron');
// const { PDFDocument };
// const { PDFDocument } = require('pdf-lib');
// const { BrowserWindow } = require('pdf-lib');


// const win = new BrowserWindow()
// win.webContents.openDevTools()

document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById('fileInput');
    const canvas = document.getElementById('pdfCanvas');
    const ctx = canvas.getContext('2d');

    fileInput.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (!file || file.type !== 'application/pdf') {
            console.error('Please upload a valid PDF file.');
            return;
        }

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            const page = pdfDoc.getPages()[0];

            const { width, height } = page.getSize();
            canvas.width = width;
            canvas.height = height;

            // Render the page to the canvas context
            const viewport = page.getViewport({ scale: 1 });
            const renderContext = {
                canvasContext: ctx,
                viewport: viewport
            };
            await page.render(renderContext).promise;
        } catch (error) {
            console.error('Error loading PDF:', error);
        }
    });
});

const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`


const func = async () => {
    const response = await window.versions.ping()
    console.log(response) // prints out 'pong'
}

func()