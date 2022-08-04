const express = require('express');
const fileupload  = require('express-fileupload');
const cors = require('cors');
const { PDFDocument } = require('pdf-lib');

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileupload());

let fieldsArray = [];

const mainRoutePost = async (req, res) => {
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
    //   console.log(fieldsArray);
    res.json({fieldsArray, formName:fileName.name});
};

const vratiNesto = (req, res) => {
    res.status(200).json({ radi: true })
}

app.route('/uploadpdf').post(mainRoutePost).get(vratiNesto);

app.listen(3000);

module.exports = app;
