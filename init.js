const  mdLib = require('./index.js');
const showLinks = mdLib.mdLinks2(process.argv[2]);

if(showLinks !== false){
  showLinks.forEach((lnk)=>{
    console.log(lnk);
  });
}
