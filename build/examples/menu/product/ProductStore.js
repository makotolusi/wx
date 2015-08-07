Ext.define('product.ProductStore', {
	extend : 'Ext.data.Store',
	alias : 'product.ProductStore',
fields : ['id','productCode', 'name', 'description', 'price', 'quantity', 'experience','currency','userName','entertime','systemName'],
	autoLoad : true,
	pageSize : 10,
	proxy : {
		type : 'ajax',
		url : 'http://localhost:8080/wx/productMaintenance/items',
		paramsAsJson : true,
		actionMethods : {
			read : "POST"
		},
		extraParams : {
		},
		headers : {
			'Content-Type' : 'application/json; charset=utf-8',
			'Accept' : 'application/json'
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
