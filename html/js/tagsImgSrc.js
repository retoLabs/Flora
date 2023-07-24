import utils  from '../k1/libK1_Utils.js'
import ajax   from '../k1/libK1_Ajax.js'

function taggersList(){
	vgApp.tabla = 'taggers';
	getTaggersList();
}

function plantasList(){
	vgApp.tabla = 'plantas';
	getPlantasList();
}

function fotosList(){
	vgApp.tabla = 'fotos';
	getFotosList();
}
//------------------------------------------------------------------- Ramas List
function ecoRamasList(xhr){
   var filas = utils.csv2filas(xhr.responseText);
	var lista = new Array();
	filas.map(function(fila){
		lista.push(fila);
	})
//	console.log(lista);
	vgApp.appTagsFC.updtRamasLst(lista);
	getTaggersList();

}

function getRamasList(){
	var stmt = '';
	stmt = "select * from ramas;";
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
	params.eco = ecoRamasList; 

	ajax.ajaxCmdShell(params,body);
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
	getPlantasList();

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

//------------------------------------------------------------------- Plantas List
function ecoPlantasList(xhr){
   var filas = utils.csv2filas(xhr.responseText);
	var lista = new Array();
	filas.map(function(fila){
		lista.push(fila);
	})
//	console.log(lista);
	vgApp.appTagsFC.updtplantasLst(lista);
}

function getPlantasList(){
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
	params.eco = ecoPlantasList; 

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

//------------------------------------------------------------------- tagsFoto
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
				ramasLst : [],
				taggersLst : [],
				taggerK: null,
				plantasLst: [],
				fotosLst: [],
				foto : null,
				tagsFoto : {categ:null,cntxt:null,zoom:null,tags:[]},
				categLst : ['TIJA/TRONC','FULLA','FLOR','FRUIT','SUBTERRANI','PORT','HABITAT','ALTRES']
			},
		methods : {
			setCateg : function(categ){
				this.tagsFoto.categ = categ;
			},
			updtRamasLst : function (ramasLst){
				this.ramasLst = ramasLst;
			},
			updtTaggersLst : function (taggersLst){
				this.taggersLst = taggersLst;
			},
			updtplantasLst : function (plantasLst){
				this.plantasLst = plantasLst;
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
			updtTags :function (tags){
				this.tagsFoto.tags = tags;
				console.log(this.tagsFoto.tags.join(';'));
			},
			getRamaFoto(cod){
				var laRama = null;
				this.ramasLst.map(function(r){
//					console.log(r.cod+'->'+r.rama);
					if (r.cod == cod) laRama = r.rama;
				});
				return laRama;
			},
			cargaFoto(foto){
				this.foto = foto;
//				console.log('rama:' + foto.rama);
				var urlImg = this.getRamaFoto(foto.rama);
				if (urlImg){
					urlImg += foto.taxon+".";
					urlImg += foto.ejemp +".";
					urlImg += foto.num+".";
					urlImg += foto.formato;

					var img = utils.r$('foto');
					img.src = urlImg;
//					cargaTagsFoto(this.taggerK,foto.id);
				}
				else alert('Error en path de la foto')
			},
			showInfo : function(){
			}
		}
	})
}

export default {initAppTags,getTaggersList,getPlantasList,getRamasList}



//  lista links : http://worldplantas.webarchiv.kit.edu
//http://ww2.bgbm.org/mcl/results.asp?name=Acanthus+mollis&area1=&bool1=&mclStatus1=&order=name&count=4&advanced=&family=&Submit=Query
//https://www.ncbi.nlm.nih.gov/gquery/?term=Acanthus+mollis