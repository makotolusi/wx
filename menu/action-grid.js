Ext.require(['Ext.grid.*', 'Ext.data.*', 'Ext.util.*', 'Ext.Action', 'Ext.data.*', 'Ext.toolbar.*', 'activity.ActivityForm', 
             'product.Grid', 'activity.ActivityStore', 'Global', 'activity.ActivityProductGrid']);
var ROOT_URL = 'http://localhost:8080/mgserver';
Ext.onReady(function() {
	Ext.QuickTips.init();

	// sample static data for the store
	var myData = [['3m Co', 71.72, 0.02, 0.03, '9/1 12:00am'], ['Alcoa Inc', 29.01, 0.42, 1.47, '9/1 12:00am'], ['Altria Group Inc', 83.81, 0.28, 0.34, '9/1 12:00am'], ['American Express Company', 52.55, 0.01, 0.02, '9/1 12:00am'], ['American International Group, Inc.', 64.13, 0.31, 0.49, '9/1 12:00am'], ['AT&T Inc.', 31.61, -0.48, -1.54, '9/1 12:00am'], ['Boeing Co.', 75.43, 0.53, 0.71, '9/1 12:00am'], ['Caterpillar Inc.', 67.27, 0.92, 1.39, '9/1 12:00am'], ['Citigroup, Inc.', 49.37, 0.02, 0.04, '9/1 12:00am'], ['E.I. du Pont de Nemours and Company', 40.48, 0.51, 1.28, '9/1 12:00am'], ['Exxon Mobil Corp', 68.1, -0.43, -0.64, '9/1 12:00am'], ['General Electric Company', 34.14, -0.08, -0.23, '9/1 12:00am'], ['General Motors Corporation', 30.27, 1.09, 3.74, '9/1 12:00am'], ['Hewlett-Packard Co.', 36.53, -0.03, -0.08, '9/1 12:00am'], ['Honeywell Intl Inc', 38.77, 0.05, 0.13, '9/1 12:00am'], ['Intel Corporation', 19.88, 0.31, 1.58, '9/1 12:00am'], ['International Business Machines', 81.41, 0.44, 0.54, '9/1 12:00am'], ['Johnson & Johnson', 64.72, 0.06, 0.09, '9/1 12:00am'], ['JP Morgan & Chase & Co', 45.73, 0.07, 0.15, '9/1 12:00am'], ['McDonald\'s Corporation', 36.76, 0.86, 2.40, '9/1 12:00am'], ['Merck & Co., Inc.', 40.96, 0.41, 1.01, '9/1 12:00am'], ['Microsoft Corporation', 25.84, 0.14, 0.54, '9/1 12:00am'], ['Pfizer Inc', 27.96, 0.4, 1.45, '9/1 12:00am'], ['The Coca-Cola Company', 45.07, 0.26, 0.58, '9/1 12:00am'], ['The Home Depot, Inc.', 34.64, 0.35, 1.02, '9/1 12:00am'], ['The Procter & Gamble Company', 61.91, 0.01, 0.02, '9/1 12:00am'], ['United Technologies Corporation', 63.26, 0.55, 0.88, '9/1 12:00am'], ['Verizon Communications', 35.57, 0.39, 1.11, '9/1 12:00am'], ['Wal-Mart Stores, Inc.', 45.45, 0.73, 1.63, '9/1 12:00am']];

	/**
	 * Custom function used for column renderer
	 * @param {Object} val
	 */
	function change(val) {
		if (val > 0) {
			return '<span style="color:green;">' + val + '</span>';
		} else if (val < 0) {
			return '<span style="color:red;">' + val + '</span>';
		}
		return val;
	}

	/**
	 * Custom function used for column renderer
	 * @param {Object} val
	 */
	function pctChange(val) {
		if (val > 0) {
			return '<span style="color:green;">' + val + '%</span>';
		} else if (val < 0) {
			return '<span style="color:red;">' + val + '%</span>';
		}
		return val;
	}

	// create the data store
	var store = Ext.create('activity.ActivityStore', {
	});

	var sellAction = Ext.create('Ext.Action', {
		icon : '../shared/icons/fam/delete.gif', // Use a URL in the icon config
		text : '编辑商品',
		disabled : true,
		handler : function(widget, event) {
			var rec = grid.getSelectionModel().getSelection()[0];
			if (rec) {
				//create window
				var win = Ext.create('Ext.window.Window', {
					title : '绑定产品',
					height : 600,
					width : 700,
					layout : 'fit',
					items : {
						xtype : 'grid-activity-product',
						store : Ext.create('activity.ActivityProductStore', {
							proxy : {
								url : ROOT_URL + '/activityext/getactivityproducts/'+rec.get('id')
							}
						}),
						activityId : rec.get('id')
					}
				}).show();
			}
		}
	});
	var delAction = Ext.create('Ext.Action', {
		icon : '../shared/icons/fam/delete.gif', // Use a URL in the icon config
		text : '删除',
		disabled : true,
		handler : function(widget, event) {
			var rec = grid.getSelectionModel().getSelection()[0];
			if (rec) {
				Ext.example.msg('Sell', 'Sell ' + rec.get('company'));
			}
		}
	});

	var updateAction = Ext.create('Ext.Action', {
		icon : '../shared/icons/fam/delete.gif', // Use a URL in the icon config
		text : '修改',
		disabled : true,
		handler : function(widget, event) {
			var rec = grid.getSelectionModel().getSelection()[0];
			if (rec) {
				console.log(rec.get('email'));
				//create window
				var updateActivityWin = Ext.create('Ext.window.Window', {
					title : '修改活动',
					height : 600,
					width : 500,
					layout : 'fit',
					items : {
						xtype : 'form-activity',
						id : rec.get('id'),
						activityName : rec.get('activityName'),
						specialName : rec.get('specialName'),
						description : rec.get('description'),
						rushBeginTime : rec.get('rushBeginTime'),
						rushEndTime : rec.get('rushEndTime'),
						rushStatus : rec.get('rushStatus'),
						imgUrl : rec.get('imgUrl')
					}
				}).show();
				Ext.example.msg('Sell', 'Sell ' + rec.get('company'));
			}
		}
	});

	var buyAction = Ext.create('Ext.Action', {
		iconCls : 'buy-button',
		text : '绑定商品',
		disabled : true,
		handler : function(widget, event) {
			var rec = grid.getSelectionModel().getSelection()[0];
			if (rec) {
				//create window

				var win = Ext.create('Ext.window.Window', {
					title : '绑定产品',
					height : 600,
					width : 700,
					layout : 'fit',
					items : {
						xtype : 'grid-product',
						store : Ext.create('product.ProductStore', {

						}),
						activityId : rec.get('id')
					}
				}).show();
				Ext.getCmp('productGrid').getSelectionModel().on({
					selectionchange : function(sm, selections) {
						if (selections.length) {
							Ext.getCmp('bindBtn').enable();
						} else {
							Ext.getCmp('bindBtn').disable();
						}
					}
				});
				//				Ext.example.msg('Buy', 'Buy ' + rec.get('company'));
			}
		}
	});

	var contextMenu = Ext.create('Ext.menu.Menu', {
		items : [buyAction, sellAction]
	});

	// create the Grid
	var grid = Ext.create('Ext.grid.Panel', {
		store : store,
		columnLines : true,
		columns : [{
			text : '活动名称',
			width : 150,
			sortable : false,
			dataIndex : 'activityName'
		}, {
			text : '专场名称',
			width : 150,
			sortable : false,
			dataIndex : 'specialName'
		}, {
			text : '描述',
			width : 200,
			sortable : false,
			dataIndex : 'description'
		}, {
			text : '抢购时间',
			width : 150,
			sortable : false,
			dataIndex : 'rushBeginTime'
		}, {
			text : '结束时间',
			width : 150,
			sortable : false,
			dataIndex : 'rushEndTime'
		}, {
			text : '抢购状态',
			width : 150,
			sortable : false,
			dataIndex : 'rushStatus'
		}, {
			text : '图片预览',
			width : 150,
			sortable : false,
			dataIndex : 'imgUrl'
		}, {
			text : '创建人',
			width : 150,
			sortable : false,
			dataIndex : 'userName'
		}, {
			text : '录入时间',
			width : 150,
			sortable : false,
			dataIndex : 'entertime'
		}],
		dockedItems : [{
			xtype : 'toolbar',

			items : [{
				xtype : 'textfield',
				name : 'name',
				fieldLabel : '关键词'
			}, {
				iconCls : 'icon-add',
				text : '搜索',
				scope : this,
				handler : this.onAddClick
			}, '->', {
				iconCls : 'icon-add',
				text : '新增',
				scope : this,
				handler : this.onAddClick
			}, buyAction, sellAction, updateAction, delAction]
		}, {
			xtype : 'pagingtoolbar',
			store : store, // GridPanel中使用的数据
			dock : 'bottom',
			displayInfo : true
		}],
		viewConfig : {
			stripeRows : true,
			listeners : {
				itemcontextmenu : function(view, rec, node, index, e) {
					e.stopEvent();
					contextMenu.showAt(e.getXY());
					return false;
				}
			}
		},

		title : '活动管理',
		renderTo : 'grid-example',
		stateful : false
	});

	//product list
	var products = Ext.create('Ext.grid.Panel', {

	});

	grid.getSelectionModel().on({
		selectionchange : function(sm, selections) {
			if (selections.length) {
				buyAction.enable();
				sellAction.enable();
				updateAction.enable();
			} else {
				buyAction.disable();
				sellAction.disable();
				updateAction.disable();
			}
		}
	});

});
