import {vgk}  from '../k1/libK1_Utils.js'

export var vgApp = {
	paramsXHR : {
		url : 'http://' + window.location.host + '/flora/',
		base : '/datos',
		otro : '',
		iam : '',
		eco : null
	},
	sqlite : {
		base   : '/shell/sqlite',
		userDB : 'usersFlora.sqlite',
		sessDB : 'sessFlora.sqlite',
		pathDB : 'apps/Flora/sqlite',
		repoDB : 'repoFlora.sqlite',
		notaDB : 'notasFlora.sqlite',
		stmtDB : '',
	},
	encript : {
		base   : '/shell/encript',
	}
}

export function goPag(pag,_id){
	if (vgk.params) var idSess = vgk.params.idSess;
	switch (pag){
	}
}

