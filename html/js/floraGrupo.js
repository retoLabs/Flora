vgFloraGrupo = {
	Arbol : '',
	Temas : '',
	Notas : '',
	Fotos : '', // drags
	nomGr : ''
}
//------------------------------------------------------------------- Arbol
function showEspecies(){
	$('divBase').update();
	var ul = new Element('ul');
	FC_SPP.each(function(sp){
		var str = sp.replace(' ','_');
		var li = new Element('li');
		var a = new Element('a',{className:'btn btn-default',href:'https://species.wikipedia.org/wiki/'+str, target:'_blank'}).update(sp);
		li.appendChild(a);
		ul.appendChild(li);
	})
	$('divBase').appendChild(ul);

}
function showGrupoTree(nodo,divBase,nivel){
   var id0 = nodo.get('id0');
   var cod = nodo.get('cod');
   var tag = nodo.get('tag');
   var txt = nodo.get('txt');
   var divNodo = new Element('div');
   if (cod == '_nodo0') return;
   else if (cod == 'NOTE'){
	   divNodo.style.marginLeft='30px';
	   var foto = new Element('img',{src:'ico/nota.png',width:'30px',onclick:'javascript:editNoteGrupo('+nodo.get('id0')+')'});
	   divNodo.appendChild(foto);
//	   var a = new Element('a',{className: 'btn btn-default', href:'javascript:editNoteGrupo('+nodo.get('id0')+')'}).update(nodo.get('tag'));
//	   divNodo.appendChild(a);
      txt = txt.split('\n').join('<br>');
	   var txt = new Element('span',{className: 'btn btn-default'}).update(txt);
	   txt.style.textAlign = 'left';
	   divNodo.appendChild(txt);
     }
   else {
	   var foto = new Element('img',{src:nodo.get('etc'),width:'50px'});
	   divNodo.appendChild(foto);
	   var a = new Element('a',{className: 'btn btn-default', href:'javascript:editNodoGrupo('+id0+')'}).update('<strong>'+tag+'</strong>');
	   divNodo.appendChild(a);
   }
   $(divBase).appendChild(divNodo);

}
function mostrarArbol(){
	var temas = vgFloraGrupo.Temas.getNodos();
	var id0 = temas[0].get('id0');
	var n = temas.length;
	for (var i=1;i<n;i++) temas[i].set('id1',id0); // pone temas como hijos del _nodo0
	var notes = vgFloraGrupo.Notas.getNodos();
	notes = clonaArray(notes);//comun.js. Para que no afecte el splice a las notas
	notes.splice(0,1); // Elimina el _falso0
	var nodos = temas.concat(notes);
	var nodosOK = optimizaNodosArbol(nodos);
	vgFloraGrupo.Arbol = new retoArbol(nodosOK,showGrupoTree);
   vgFloraGrupo.Arbol.expandAll();
   vgFloraGrupo.Arbol.show('divBase');
}
//------------------------------------------------------------------- Vistas Grupo
function vistaEdit(){vgFloraGrupo.Temas.show('divBase');}
function vistaFoto(){ moverDrags();}
function vistaNote(){vgFloraGrupo.Notas.show('divBase');}
function vistaTree(){mostrarArbol();}
//------------------------------------------------------------------- Anotaciones
function addNotaNenx(frmId){
	var nenx = frm2nodo(frmId,true);
	var tag = nenx.get('tag');
	var id0 = nenx.get('id0');
	
	var nodo = getNodoNuevo('Nota ('+tag+')');
	nodo.set('cod','NOTE');
	nodo.set('id1',id0);
	
	vgFloraGrupo.Notas.addNodoSelf(nodo);
	vgFloraGrupo.Notas.show('divBase');
}

function showNodosDnD(nodo,i,divBase){
   var divNodo = new Element('div',{id:'drag_'+i,className:'divDrag'})
	var foto = new Element('img',{src:nodo.get('etc'),width:'80px'});
	divNodo.appendChild(foto);
	var tag = new Element('span').update(nodo.get('tag'));
	divNodo.appendChild(tag);
	$(divBase).appendChild(divNodo);
}


function moverDrags(){
	$('divBase').update();
	var nodos = vgFloraGrupo.Temas.getNodos();
	var DragDrop = new retoDivsDnD(nodos,showNodosDnD);
	DragDrop.setGrid(0);
	DragDrop.setUpdtGeo(true);
	DragDrop.setLayout('GEO');
	DragDrop.showNodos('SHOW');
	DragDrop.setTriggerPostDrop();
	DragDrop.initMoverDiv('divBase');
	vgFloraGrupo.Fotos = DragDrop;
}


function cancelEditGrupo(){
	$('divFrmMain').show();
	$('divFrmNodo').hide();
}

function editNoteGrupo(id){
	var nodo = vgFloraGrupo.Notas.getNodoById(id);
	var frm = creaFormEdNotes(nodo,'Grupo');
	var modal = new retoModal(frm);
	nodo2frm('frmEdNodo',nodo);
}

function showNotesGrupo(nodo,divBase){
   var cod = nodo.get('cod');
   if (cod != 'NOTE') return;
   
	var divNodo = new Element('div');
	var foto = new Element('img',{src:'ico/nota.png',width:'30px'});
	divNodo.appendChild(foto);
	var a = new Element('a',{className: 'btn btn-default', href:'javascript:editNoteGrupo('+nodo.get('id0')+')'}).update(nodo.get('tag'));
	divNodo.appendChild(a);
	var txt = new Element('span',{className: 'btn btn-default'}).update(nodo.get('txt'));
	divNodo.appendChild(txt);
	$(divBase).appendChild(divNodo);
}
function grabaNoteGrupo(frmId){
	var nodo = frm2nodo(frmId,true);
	vgFloraGrupo.Notas.updtNodoSelf(nodo);
	vgFloraGrupo.Notas.show('divBase');
}

function editNodoGrupo(id){
	var nodo = vgFloraGrupo.Temas.getNodoById(id);
	var botones = getBtns_OK_KO(true,'grabaNodoGrupo("frmEdNodo")');
	var mask = getNodoMask(0,0,0,'NdN','NdN','codigo','titulo','etc','txt');
	var editor = new retoEditNodo('Editor Nodo Arbol',nodo,mask,botones);
	var modal = new retoModal(editor.show());
	nodo2frm('frmEdNodo',nodo);
}

function showTemasGrupo(nodo,divBase){
   var cod = nodo.get('cod');
   if (cod == 'NOTE') return;
   
	var divNodo = new Element('div');
	var foto = new Element('img',{src:nodo.get('etc'),width:'50px'});
	divNodo.appendChild(foto);
	var a = new Element('a',{className: 'btn btn-default', href:'javascript:editNodoGrupo('+nodo.get('id0')+')'}).update(nodo.get('tag'));
	divNodo.appendChild(a);
	$(divBase).appendChild(divNodo);
}

function addNodoTema(){
	var nodo = getNodoNuevo('Nuevo');
	nodo.set('cod','TEMA');
	nodo.set('etc','ico/nene.jpg');
	vgFloraGrupo.Temas.addNodoSelf(nodo);
	vgFloraGrupo.Temas.show('divBase');
}

function grabaNodoGrupo(frmId){
	var nodo = frm2nodo(frmId,true);
	vgFloraGrupo.Temas.updtNodoSelf(nodo);
	vgFloraGrupo.Temas.show('divBase');
}
function borraNodoGrupo(frmId){
	var nodo = frm2nodo(frmId,true);
	vgFloraGrupo.Temas.borraNodoSelf(nodo);
	vgFloraGrupo.Temas.show('divBase');
}

function nuevoGrupo(){
   var nombre = vgFloraGrupo.nomGr;

	var nenx0 = getNodoZero(nombre,'CONJT');
	var temas = new Array();
	temas.push(nenx0);
	vgFloraGrupo.Temas = new retoConjt(temas,showTemasGrupo)
	
	var note0 = getNodoZero('Notas','CONJT'); // para tratar el Conjt de Notas
	var notes = new Array();
	notes.push(note0);
	vgFloraGrupo.Notas = new retoConjt(notes,showNotesGrupo)
}

//------------------------------------------------------------------- Carga Grupo
// Al cargar el grupo, se divide en dos conjuntos: Temas y Notas
function ecoCargaGrupo(resp){
try{
	var nodo, txt;
	var lins = resp.responseText.split('\n');
	var strNodos = lins[2];
   if (strNodos == 'bye'){nuevoGrupo();alert('Creado Grupo.\n Añadir alumnos');return;}
   	
	var hNodos = JSON.parse(strNodos);
	var temas = new Array();
	var notes = new Array();
	
	var note0 = getNodoZero('Notas','CONJT'); // para tratar el Conjt de Notas
	notes.push(note0);
	
	hNodos.nodos.each(function(nodox){
		nodo = $H(nodox);
		restauraNodo(nodo);
		if (nodo.get('cod') == 'NOTE') notes.push(nodo);
		else temas.push(nodo);
	})
	vgFloraGrupo.Temas  = new retoConjt(temas,showTemasGrupo)
	vgFloraGrupo.Notas = new retoConjt(notes,showNotesGrupo)
	vistaFoto();
}catch(e){alert(e.message);}
}


function cargaGrupo(nombre){
	var stmt = 'db.Flora.find({"nombre" : "'+nombre+'"},{"_id":0,"nodos":1})';
	console.log(stmt);
	ajaxQueryMongoDB('RETO',stmt,'/home/reto/Apps/Flora/admin',ecoCargaGrupo);
}

//------------------------------------------------------------------- Graba Grupo
function ecoGrabaGrupoXYZ(resp){
	console.log('ecoGrabaGrupo '+resp.responseText);
}

function nodos2docum(nombre,tipo,mask,nodos){
	var stmt = 'db.Flora.remove({nombre:"'+nombre+'"})\n';
	stmt += 'db.Flora.insert({nombre:"'+nombre+'", tipo:"'+tipo+'", mask:"'+mask+'", nodos:';
	stmt += arrayJSON(nodos);
	stmt += '})';
	return stmt;
}

function grabaGrupo(){
	var nom = vgFloraGrupo.nomGr;
	var temas = vgFloraGrupo.Temas.getNodos();
	var notes = vgFloraGrupo.Notas.getNodos();
	notes = clonaArray(notes);//comun.js. Para que no afecte el splice a las notas
	notes.splice(0,1); // Elimina el _nodo0
	var nodos = temas.concat(notes);
	var stmt = nodos2docum(nom,'CONJT','.conjt',nodos);
	console.log('+'+stmt);
	ajaxQueryMongoDB('RETO',stmt,'/home/reto/Apps/Flora/admin',ecoGrabaGrupoXYZ);
}

function ecoBorraGrupo(resp){
	console.log('ecoBorraGrupo '+resp.responseText);
}

function borraGrupo(frmId){
	var nombre = vgFloraGrupo.nomGr;
	var stmt = 'db.Flora.remove({nombre:"'+nombre+'"})\n';
	ajaxQueryMongoDB('RETO',stmt,ecoBorraGrupo);

}

//------------------------------------------------------------------- Inicio

function hookInitPag(nomGrupo){
	vgFloraGrupo.nomGr = nomGrupo + '_Grupo';
	cargaGrupo(vgFloraGrupo.nomGr);
}

function hookGrabaGrupo(){grabaGrupo()}
function hookCambiaPassword(){cambiaPassword();}

