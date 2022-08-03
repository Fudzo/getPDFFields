const express = require('express');
const fileupload  = require('express-fileupload');
const cors = require('cors');
const { PDFDocument } = require('pdf-lib');

const app = express();

app.use(fileupload());
app.use(cors());
app.use(express.json());

let fieldsArray = [];

const mainRoutePost = async (req, res) => {
    console.log('asdasd');

// console.log(req.files.myFile);
    fieldsArray = [];
    const fileName = req.files.myFile;
    const pdfDoccc = await PDFDocument.load(fileName.data);
    const form = pdfDoccc.getForm();
    const fields = form.getFields();

    fields.forEach(field => {
        const type = field.constructor.name
        const name = field.getName()
        fieldsArray.push(name);
    
      });
      console.log(fieldsArray);
    res.json({fieldsArray, formName:fileName.name});
};

app.route('/uploadpdf').post(mainRoutePost);

app.listen(3000);