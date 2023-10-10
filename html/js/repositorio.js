
import {vgApp,goPag}    from '/flora/js/flora_VGlob.js'

import {floraList,faunaList,hortaList,frutaList,arvenseList} from '/flora/js/repositorioSrc.js'
import src from '/flora/js/repositorioSrc.js'
import sess   from '../k1/libK1_Sesion.js'

window.vgApp = vgApp; // import para Ajax
window.goPag = goPag;

window.floraList = floraList; // import para link menu
window.faunaList = faunaList;
window.hortaList = hortaList;
window.frutaList = frutaList;
window.arvenseList = arvenseList;
window.setWeb4info = src.setWeb4info;
window.showInfoEspecie = src.showInfoEspecie;

async function loadPlantas() {
  const response = await fetch('./json/misPlantas.json');
  const plantas = await response.json();
  plantas.lista.map(function(planta){
  	console.log(planta.nom);
  })
//  console.log(plantas); 
}
function sesionRepositorioOK(){
//	loadPlantas();
	src.initAppRepo();
	src.setWeb4info('WIKI_ES');
	src.getEspeciesList('FLORA');
}

function initRepositorio(){
//	sess.validaSesion('usrMenu', sesionRepositorioOK); // kernel/libK1_sesion.js
	sesionRepositorioOK();
}

window.onload = initRepositorio;
//  lista links : http://worldplants.webarchiv.kit.edu
//http://ww2.bgbm.org/mcl/results.asp?name=Acanthus+mollis&area1=&bool1=&mclStatus1=&order=name&count=4&advanced=&family=&Submit=Query
//https://www.ncbi.nlm.nih.gov/gquery/?term=Acanthus+mollis