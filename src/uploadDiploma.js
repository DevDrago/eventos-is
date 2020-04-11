const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const hbs = require('handlebars');
const path = require('path');
const process = require('process'); 
const connection= require("./config/dbConnection")
const conexion = connection();
const uploadDiploma = {}

const compile = async function(templateName, data){
    const filePath = path.join(process.cwd(), 'views', `${templateName}.hbs`);
    const html = await fs.readFile(filePath, 'utf-8');
    return hbs.compile(html)(data);
}

const updateDiplomaPath = async function(newPath, actividad, usuario){
    await new Promise((resolve, reject) => {
        conexion.query(`Update actividad_asistencia set rutaDiploma = ?
        where idActividad_fk = ? and idUsuario_fk = ?`,
        [newPath,actividad, usuario],(error,result)=>{
            if(error){
                reject(error);
            }
            if(result){
                resolve(result);
            }
        })
    })
}

uploadDiploma.upload = async function(pdfData){
    await new Promise((resolve, reject) => { 
        try{
            (async function(){
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                const content = await compile('diploma', pdfData);
                const $diplomaPath = `../public/Diplomas/Diploma-${pdfData.usuario}-${pdfData.nombreActividad}.pdf`;
                await page.setContent(content);
                await page.emulateMediaFeatures('screen');
                await page.pdf({
                    path: $diplomaPath,
                    format: 'Letter',
                    printBackground: true,
                    landscape: true
                });
                await browser.close();
                updateDiplomaPath($diplomaPath, pdfData.idActividad_fk, pdfData.idUsuario_fk).then(() =>{
                    resolve(true);
                });
                //resolve(true)
            })();
            
        } catch(e) {
            reject(e)
        }
    })
};

module.exports = uploadDiploma