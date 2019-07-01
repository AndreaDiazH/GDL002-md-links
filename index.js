const fs = require ("fs");
const request = require("request");


const mdlinks = (path, options) => {
  return new Promise ((resolve, reject)=>{
    const newpath = path;
    if(newpath === "")return false;
    let theFiles = [];
    let itsDir = fs.lstatSync(newpath).isDirectory();
    if (itsDir){
      theFiles = fs.readdirSync(newpath);
    }
    else {
      theFiles[0] = newpath;
    }
    let theLinks = [];
    theFiles.forEach((arch)=>{
      if(arch.endsWith(".md")){
        validateFile((itsDir ? path + "/":"") + arch, theLinks);
      }
    });
    if(options !== undefined && typeof(options) === "object"){
      if(options.validate === true){
        let checking = validateLink(theLinks);
        checking.then((ok)=>{
          if(ok == true){
            resolve(theLinks);
          }
        })
      }else {
        if(theLinks.length > 0){
          resolve(theLinks);
        };
      }
    } else{
      if(theLinks.length > 0){
        resolve(theLinks);
      };
    };
  });
  
}

const validateLink = (obj) => {
  return new Promise ((resolve) =>{
    let counter = 0;
    obj.forEach((a)=>{
      request(a.href, (err, response, body)=>{
        if(response !== undefined && (response.statusCode === 200 || response.statusCode ===301)) a.valid = true; else a.valid = false;
        if(++counter == obj.length){
          resolve(true);
        }
      });
    });
  });
}

/*const vl = async(list) =>{ 
  let resulta = await validateLink(list);
  return resulta;
} */

const validateFile = (archive, newArray) => {
  const newFile = fs.readFileSync(archive);
  const readLines = newFile.toString().split('\n');
  readLines.forEach((eachLine)=>{
    let positionLink = foundLink(eachLine);
    if(positionLink !== false && positionLink >= 0){
      let checkLink = extractLinks(positionLink, eachLine);
      checkLink.file = archive;
      newArray.push(checkLink);
    }
  });
};

const extractLinks = (position, strg) => {
  let textLink = strg.substring(position + 1, strg.indexOf(']('));
  let hrefLink = strg.substring(textLink.length + (position + 3), strg.indexOf(')'));
  let newLink = {
    "text": textLink,
    "href": hrefLink,
    "file": null
  };
  return newLink;
};
//regresa un arreglo

const foundLink = (strg) =>{
  const regEx = /(\[.*\]\()(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/;
  if((position = strg.search(regEx)) != -1){
    return position;
  }
  return false;
};

module.exports = {
   "mdLinks2": mdlinks,
   "foundLink": foundLink,
   "extractLinks": extractLinks
};



//1. recibir una ruta x
//2. abre la ruta x
//2.1. validar si es ruta o archivo x
  //2.1.1 si es una ruta, obtener listado de archivos x
  //2.1.2 si es un archivo, procesar el archivo x
//3. inicia arreglo vacio para colectar objetos (links) x
//4. por cada archivo .md abre el archivo
  //5. por cada linea que "lee" en el archivo
    //6. si la linea contiene el patrón "https://www.algo.com.mx"
      //7. entonces la agrega al Array
    //8. si no, la (linea)  lo ignora.
  //9. termina las lineas del archivo.
//10. termina los archivos.
//11. imprime el array con la información colectada.
//12. si parametro "option" es validate: true
  //13. por cada elemento del array
    //14. si valida URL (respuestas 301, 200)
      //15. marca el elemento como valido
      //16. si no, lo marca como no valido.
    //17. fin de la validación
  //18. termina de "leer" elementos del array
  //19. re-imprime el array
//20. fin de "option/validate"
