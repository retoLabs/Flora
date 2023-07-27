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
	var stmt = "select * from ramas;";
	execDDL_SQLite(stmt,ecoRamasList); 
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
	var stmt = "select * from taggers;";
	execDDL_SQLite(stmt,ecoTaggersList); 
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
	var stmt = "select * from plantas;";
	execDDL_SQLite(stmt,ecoPlantasList); 
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
	var stmt = "select * from fotos where taxon='"+t+"';";
	execDDL_SQLite(stmt,ecoFotosList); 
}

//------------------------------------------------------------------- tagsFoto
function ecoTagsFoto(xhr){
   var filas = utils.csv2filas(xhr.responseText);
	var lista = new Array();
	filas.map(function(fila){
		lista.push(fila);
	})
	console.log(utils.o2s(lista));

}

function cargaTagsFoto(taggerK,foto_id){
	var stmt = "select * from tags_fotos where tagger='"+taggerK+"' and foto_id="+foto_id+";";
	execDDL_SQLite(stmt,ecoTagsFoto); 
}
//------------------------------------------------------------------- DML SQLite TagsFC

// Para insert,update,delete:
function ecoDDL_SQLite(xhr){
	alert(xhr.responseText);
}
function execDDL_SQLite(stmt,eco){
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
	params.eco = eco; 

	ajax.ajaxCmdShell(params,body);
}//------------------------------------------------------------------ apps Vue.js
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
			getContexto : function(){
				var frmId = null;
				var cntxt = null;
				switch (this.tagsFoto.categ){
					case 'TIJA/TRONC': frmId = 'TT'; break;
					case 'FULLA': frmId = 'FU'; break;
					case 'FLOR': frmId = 'FL'; break;
					case 'FRUIT': frmId = 'FR'; break;
					case 'SUBTERRANI': frmId = 'SU'; break;
					case 'PORT': frmId = 'PO'; break;
					case 'HABITAT': frmId = 'HA'; break;
					case 'ALTRES': frmId = 'AL'; break;
				}
				var frm = utils.r$(frmId);
				cntxt = frm.elements["SUBCAT"].value;
				return cntxt;
			},
			grabaTags : function(){
				if (!this.taggerK){alert('Tagger null'); return};
				if (!this.foto.id){alert('Taxon null')}; return;
				if (!this.tagsFoto.categ){alert('Categoria null'); return};
				if (!this.tagsFoto.categ){alert('Categ contexto null'); return};
				if (!this.tagsFoto.categ){alert('Zoom null'); return};

				this.tagsFoto.cntxt =this.getContexto();
				var stmt = 'insert into tags_fotos (tagger,foto_id,categ,cntxt,zoom,tags) values (';
				stmt += "'"+this.taggerK+"',";
				stmt += this.foto.id+",";
				stmt += "'"+this.tagsFoto.categ+"',";
				stmt += "'"+this.tagsFoto.cntxt+"',";
				stmt += "'"+this.tagsFoto.zoom+"',";
				stmt += "'"+this.tagsFoto.tags.join(';')+"');";
				execDDL_SQLite(stmt,ecoDDL_SQLite);
			},
			setTaggerK : function(cod){
				this.taggerK = cod;
			},
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
				this.tagsFoto.tags = this.tagsFoto.tags.concat(tags);
				console.log(utils.o2s(this.tagsFoto));
			},
			getRamaFoto :function (cod){
				var laRama = null;
				this.ramasLst.map(function(r){
//					console.log(r.cod+'->'+r.rama);
					if (r.cod == cod) laRama = r.rama;
				});
				return laRama;
			},
			cargaFoto :function (foto){
				this.foto = foto;
				console.log(utils.o2s(foto));
				var urlImg = this.getRamaFoto(foto.rama);
				if (urlImg){
					urlImg += foto.taxon+".";
					urlImg += foto.ejemp +".";
					urlImg += foto.num+".";
					urlImg += foto.formato;

					var img = utils.r$('foto');
					img.src = urlImg;
					cargaTagsFoto(this.taggerK,foto.id);
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