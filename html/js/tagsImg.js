import {vgApp,goPag}    from '/flora/js/flora_VGlob.js'
import src from '/flora/js/tagsImgSrc.js'
import sess   from '../k1/libK1_Sesion.js'

window.vgApp = vgApp; // import para Ajax
window.goPag = goPag;
/*
window.floraList = floraList; // import para link menu
window.faunaList = faunaList;
window.hortaList = hortaList;
window.frutaList = frutaList;
window.arvenseList = arvenseList;
window.setWeb4info = src.setWeb4info;
window.showInfoEspecie = src.showInfoEspecie;
*/

function sesionTagsImgOK(){
	src.initAppTags();
	src.getTaggersList();
}

function initTagsImg(){
//	sess.validaSesion('usrMenu', sesionRepositorioOK); // kernel/libK1_sesion.js
	sesionTagsImgOK();
}

window.onload = initTagsImg;
