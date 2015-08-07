Ext.define('activity.ActivityStore', {
	extend : 'Ext.data.Store',
	alias : 'activity.ActivityStore',
fields : ['id','activityName', 'specialName', 'description', 'rushBeginTime', 'rushEndTime', 'rushStatus','imgUrl','userName','entertime'],
	autoLoad : true,
	pageSize : 30,
	proxy : {
		type : 'ajax',
		url : 'http://localhost:8080/mgserver/activityext/items',
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
