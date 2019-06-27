

const fs = require ("fs");


const mdlinks = (path, options) => {
  const newpath = path;
  if(newpath === "")return false;
  let theFiles = [];
  if (fs.lstatSync(newpath).isDirectory()){
    theFiles = fs.readdirSync(newpath);
  }
  else {
    theFiles[0] = newpath;
  }
  let theLinks = [];
  theFiles.forEach((arch)=>{
    if(arch.endsWith(".md")){
      validateFile(arch, theLinks);
    }
  });
}

const validateFile = (archive, array) => {
  console.log(archive);
  const newFile = fs.readFileSync(archive);
  const readLines = archive.toString().split('\n');
  readLines.forEach((eachLine)=>{
    foundLink(eachLine);
  })
};
//regresa un arreglo

const foundLink = (strg) =>{
  //if(strg == "") return false;
  const regEx = /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/;
  if(strg.search(regEx) != -1){
    console.log(strg);
    return true;
    //theLinks.push(strg)
  }
  return false;
};

module.exports = {
   "mdLinks2": mdlinks,
   "foundLink": foundLink
};


//regresa un objeto

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
