const path = require('path');
const image_file = path.join(__dirname, '..', 'images', 'codabar-text.png')

// Barcode
let Dynamsoft = require("dynamsoft-node-barcode");
// Get a free trial license from https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx
Dynamsoft.BarcodeReader.productKeys = 't0068NQAAAEVstLIsgc9hWbA0o6jqlfcAR0BeZBLF0AhkB+7kOS63Oprq0nopsJtAeL9yNFv4U+uqp1VHtXrRTutFmod3R0g=';
 
(async()=>{
    let reader = await Dynamsoft.BarcodeReader.createInstance();
    for(let result of await reader.decode(image_file)){
        console.log('Barcode result: ' + result.barcodeText);
    }
    reader.destroy();
    await Dynamsoft.BarcodeReader._dbrWorker.terminate();
})();

//  OCR
const { createWorker } = require('tesseract.js');

const worker = createWorker({
  langPath: path.join(__dirname, '..', 'lang-data')
});

(async () => {
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  await worker.setParameters({
    tessedit_char_whitelist: '0123456789',
  });
  const { data: { text } } = await worker.recognize(image_file);
  console.log('OCR result:  ' + text);
  await worker.terminate();
})();
