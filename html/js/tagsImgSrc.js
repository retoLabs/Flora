import utils  from '../k1/libK1_Utils.js'
import ajax   from '../k1/libK1_Ajax.js'


function setWeb4info(web){
//	alert(web);
	vgApp.web = web;
	switch (web){
		case 'WIKI_ES':
			utils.r$('fuente').innerHTML = 'Buscar en: Wikipedia (es)';
			break;
		case 'WIKI_EN':
			utils.r$('fuente').innerHTML = 'Buscar en: Wikipedia (en)';
			break;
		case 'WIKISPP':
			utils.r$('fuente').innerHTML = 'Buscar en: Wikispecies (en)';
			break;
		case 'JBOTUMA':
			utils.r$('fuente').innerHTML = 'Buscar en: Jardín Botánico UMA (es)';
			break;
		case 'FLOVASC':
			utils.r$('fuente').innerHTML = 'Buscar en: Flora vascular (es)';
			break;
		case 'FLOSILV':
			utils.r$('fuente').innerHTML = 'Buscar en: Flora silvestre (es)';
			break;
		case 'EOFLIFE':
			utils.r$('fuente').innerHTML = 'Buscar en: Encyclopedia of Life (en)';
			break;
		case 'JSTORGP':
			utils.r$('fuente').innerHTML = 'Buscar en: JSTOR Global Plants (en)';
			break;
		case 'IOPI_GP':
			utils.r$('fuente').innerHTML = 'Buscar en: IOPI (en)';
			break;
		case 'GBIF_GP':
			utils.r$('fuente').innerHTML = 'Buscar en: GBIF (en)';
			break;
		case 'GBIF_ES':
			utils.r$('fuente').innerHTML = 'Buscar en: GBIF (es)';
			break;
		case 'HARVARD':
			utils.r$('fuente').innerHTML = 'Buscar en: Univ. de Harvard (en)';
			break;
		case 'CATALOG':
			utils.r$('fuente').innerHTML = 'Buscar en: Catalogue of Life (es|en|...)';
			break;
		case 'R_TORMO':
			utils.r$('fuente').innerHTML = 'Buscar en: Plantas y Hongos (es)';
			break;
		case 'PYRENEA':
			utils.r$('fuente').innerHTML = 'Buscar en: Atlas Flora Pirineos (es)';
			break;
		case 'TROPICO':
			utils.r$('fuente').innerHTML = 'Buscar en: Tropicos (en) (Missouri Botanical Garden)';
			break;
		case 'MEDLIST':
			utils.r$('fuente').innerHTML = 'Buscar en: MED Checklist';
			break;
		case 'NCBINLM':
			utils.r$('fuente').innerHTML = 'Buscar en: NCBI (National Center for Biotechnology Information)';
			break;
		case 'FCATALA':
			utils.r$('fuente').innerHTML = 'Buscar en: Flora Catalana';
			break;
		case 'ASTUNAT':
			utils.r$('fuente').innerHTML = 'Buscar en: Astur Natura';
			break;
		case 'NAVARRA':
			utils.r$('fuente').innerHTML = 'Buscar en: Vegetación Navarra';
			break;
		case 'PLANTNET':
			utils.r$('fuente').innerHTML = 'Buscar en: Plant NET';
			break;
	}
}


export function taggersList(){
	vgApp.tabla = 'taggers';
	getTaggersList();
}

export function plantsList(){
	vgApp.tabla = 'plantas';
	getPlantsList();
}

export function fotosList(){
	vgApp.tabla = 'fotos';
	getFotosList();
}


//------------------------------------------------------------------- Taggers List
function ecoTaggersList(xhr){
   var filas = utils.csv2filas(xhr.responseText);
	var lista = new Array();
	filas.map(function(fila){
		lista.push(fila);
	})
//	console.log(lista);
	vgApp.appTagsFC.updtTaggersLst(lista);
	getPlantsList();

}

function getTaggersList(){
	var stmt = '';
	stmt = "select * from taggers;";
	console.log(stmt);

	var stmtB64 = Base64.encode(stmt);
	var body = {
		id : 1234567, //vgApp.encript.sessId,
		path : vgApp.sqlite.pathDB,
		db   : 'tagsFC.sqlite',
		stmt : stmtB64
	}
	var params = vgApp.paramsXHR;
	params.base = vgApp.sqlite.base;
	params.eco = ecoTaggersList; 

	ajax.ajaxCmdShell(params,body);
}

//------------------------------------------------------------------- Plants List
function ecoPlantsList(xhr){
   var filas = utils.csv2filas(xhr.responseText);
	var lista = new Array();
	filas.map(function(fila){
		lista.push(fila);
	})
//	console.log(lista);
	vgApp.appTagsFC.updtPlantsLst(lista);
}

function getPlantsList(){
	var stmt = '';
	stmt = "select * from plantas;";
	console.log(stmt);

	var stmtB64 = Base64.encode(stmt);
	var body = {
		id : 1234567, //vgApp.encript.sessId,
		path : vgApp.sqlite.pathDB,
		db   : 'tagsFC.sqlite',
		stmt : stmtB64
	}
	var params = vgApp.paramsXHR;
	params.base = vgApp.sqlite.base;
	params.eco = ecoPlantsList; 

	ajax.ajaxCmdShell(params,body);
}
//------------------------------------------------------------------- Fotos List
function ecoFotosList(xhr){
   var filas = utils.csv2filas(xhr.responseText);
	var lista = new Array();
	filas.map(function(fila){
		lista.push(fila);
	})
//	console.log(lista);
	vgApp.appTagsFC.updtFotosLst(lista);
}

function getFotosList(t){
	var stmt = '';
	stmt = "select * from fotos where taxon='"+t+"';";
	console.log(stmt);

	var stmtB64 = Base64.encode(stmt);
	var body = {
		id : 1234567, //vgApp.encript.sessId,
		path : vgApp.sqlite.pathDB,
		db   : 'tagsFC.sqlite',
		stmt : stmtB64
	}
	var params = vgApp.paramsXHR;
	params.base = vgApp.sqlite.base;
	params.eco = ecoFotosList; 

	ajax.ajaxCmdShell(params,body);
}

//------------------------------------------------------------------- DML SQLite TagsFC
function ecoUpdateFila(xhr){
	alert(xhr.responseText);
}
function updateFila(fila){
	var stmt = "update agro set img='"+fila.img+"' where cod='" + fila.cod+"';";
	console.log(stmt);

	var stmtB64 = Base64.encode(stmt);
	var body = {
		id : 1234567, //vgApp.encript.sessId,
		path : vgApp.sqlite.pathDB,
		db   : 'tagsFC.sqlite',
		stmt : stmtB64
	}
	var params = vgApp.paramsXHR;
	params.base = vgApp.sqlite.base;
	params.eco = ecoUpdateFila; 

	ajax.ajaxCmdShell(params,body);
}

function initAppTags(){
	vgApp.appTagsFC = new Vue({
		el: '#tagsFC',
			data: {
				accion : null, // [label|review]
				taggersLst : [],
				taggerK: null,
				plantsLst: [],
				taxon :null,
				fotosLst: [],
			},
		methods : {
			updtTaggersLst : function (taggersLst){
				this.taggersLst = taggersLst;
			},
			updtPlantsLst : function (plantsLst){
				this.plantsLst = plantsLst;
			},
			updtFotosLst : function (fotosLst){
				this.fotosLst = fotosLst;
			},
			setTaxon : function (t){
				this.taxon = t;
				console.log(t);
				getFotosList(t);
			},
			updtFotos : function(fotos){
				this.fotos = fotos;
			},
			cargaFoto(foto){
				var urlImg ="https://floracatalana.cat/flora/sites/default/files/imgvasculars/2019-06/mgc2/"
				urlImg += foto.taxon+".";
				urlImg += foto.ejemp +".";
				urlImg += foto.num+".";
				urlImg += foto.formato;
				var img = utils.r$('foto');
				img.src = urlImg;
			},
			showInfo : function(){
			}
		}
	})
}

export default {initAppTags,getTaggersList,getPlantsList}



//  lista links : http://worldplants.webarchiv.kit.edu
//http://ww2.bgbm.org/mcl/results.asp?name=Acanthus+mollis&area1=&bool1=&mclStatus1=&order=name&count=4&advanced=&family=&Submit=Query
//https://www.ncbi.nlm.nih.gov/gquery/?term=Acanthus+mollis