const { PDFParse } = require('pdf-parse');

async function run() {
  try {
    const buffer = Buffer.from('hello world'); // Not a valid PDF, but should throw InvalidPDFException, NOT TypeError
    console.log('Buffer length:', buffer.length);
    
    const parser = new PDFParse({ data: buffer });
    console.log('Parser instantiated');
    
    const parsed = await parser.getText();
    console.log('Text extracted:', parsed.text);
    
    await parser.destroy();
    console.log('Success!');
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
