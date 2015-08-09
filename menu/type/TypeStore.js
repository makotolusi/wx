Ext.define('type.TypeStore', {
	extend : 'Ext.data.Store',
//	alias : 'piece.PieceStoree',
fields : ['id','username','text', 'typeName', 'notes', 'entertime'],
	autoLoad : true,
	pageSize : 10,
	proxy : {
		type : 'ajax',
		 url :  ROOT_URL + '/typemaintain/items',
//		paramsAsJson : true,
		actionMethods : {
			read : "POST"
		},
		extraParams : {
		},
		reader : {
			type : 'json',
			rootProperty : 'rows',
			totalProperty : 'total'
		},
		writer : {
			type : 'json'
		}
		// sends single sort as multi parameter
		// simpleSortMode : true,
	}
	// remoteSort : true,

	// sorters : [{
	// property : 'lastpost',
	// direction : 'DESC'
	// }]
});
