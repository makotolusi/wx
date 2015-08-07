Ext.define('activity.ActivityProductStore', {
	extend : 'Ext.data.Store',
	alias : 'activity.ActivityProductStore',
fields : ['id','activityId','productCode', 'productName', 'rushPrice', 'rushQuantity', 'bargainPrice','sortNum','status','imageUrl'],
	autoLoad : true,
	pageSize : 10,
	proxy : {
		type : 'ajax',
		// url :  ROOT_URL + '/activityext/getactivityproducts/1',
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
