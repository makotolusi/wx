Ext.require(['Ext.grid.*', 'Ext.data.*', 'Ext.util.*', 'Ext.Action', 'Ext.data.*', 'Ext.toolbar.*', 'product.ProductForm', 
             'product.Grid', 'piece.PieceStore', 'type.TypeStore']);
console.log('1111');
Ext.onReady(function() {
	Ext.QuickTips.init();

	console.log('23232');
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

	var delAction = Ext.create('Ext.Action', {
		iconCls : 'icon-dgdelete', // Use a URL in the icon config
		text : '删除',
		disabled : true,
		handler : function(widget, event) {
			Ext.MessageBox.confirm('Confirm', '确认删除吗?', function(btn, text) {
				if (btn == 'yes') {
					var rec = grid.getSelectionModel().getSelection()[0];
					if (rec) {
						Ext.Ajax.request({
							url :ROOT_URL+'/productMaintenance/delete/'+rec.get('id'),
							method : 'DELETE',
							success : function(response) {
								var text = response.responseText;
								Ext.MessageBox.alert('提示', '创建成功', function() {
										var p = Ext.getCmp('productGrid');
										p.getStore().reload();

								}, this);

							},
							failure : function(response) {
								var text = response.responseText;
								Ext.MessageBox.alert('提示', '创建失败:' + text, function() {
									var p = Ext.getCmp('productGrid');
									p.getStore().reload();
								}, this);
							}
						});
					}
				}
			});
		
		}
	});

	var updateAction = Ext.create('Ext.Action', {
		iconCls : 'icon-readd', // Use a URL in the icon config
		text : '修改',
		disabled : true,
		handler : function(widget, event) {
			var rec = grid.getSelectionModel().getSelection()[0];
			if (rec) {
				//create window
				console.log(rec.get('id'));
				var updateActivityWin = Ext.create('Ext.window.Window', {
					title : '修改',
					height : 600,
					width : 500,
					modal : true,
					layout : 'fit',
					id:'product-update-win',
					items : {
						xtype : 'form-product',
						systemName : rec.get('systemName'),
						name : rec.get('name'),
						pid : rec.get('id'),
						specialName : rec.get('specialName'),
						currency : rec.get('currency'),
						piece : rec.get('piece'),
						pieceCategory : rec.get('pieceCategory'),
						productCode : rec.get('productCode'),
						price : rec.get('price'),
						description : rec.get('description'),
						experience : rec.get('experience'),
						total : rec.get('total'),
						description : rec.get('description'),
						picUrl1 : rec.get('picUrl1'),
						picUrl2 : rec.get('picUrl2'),
						picUrl3 : rec.get('picUrl3'),
						picUrl4 : rec.get('picUrl4'),
						picUrl5 : rec.get('picUrl5'),
						picUrl6 : rec.get('picUrl6'),
						picUrl7 : rec.get('picUrl7'),
						picUrl8 : rec.get('picUrl8'),
						picUrl9 : rec.get('picUrl9'),
						picUrl10 : rec.get('picUrl10')
					}
				}).show();
			}
		}
	});
	
	var addAction = Ext.create('Ext.Action', {
		iconCls : 'icon-add', // Use a URL in the icon config
		text : '新增',
		handler : function(widget, event) {
				var updateActivityWin = Ext.create('Ext.window.Window', {
					title : '新增',
					height : 700,
					width : 350,
					layout : 'fit',
					modal : true,
					id:'product-update-win',
					items : {
						xtype : 'form-product'
					}
				}).show();
		}
	});

	

	var contextMenu = Ext.create('Ext.menu.Menu', {
		items : [updateAction,delAction ]
	});
var store= Ext.create('product.ProductStore', {

});
	// create the Grid
	var grid = Ext.create('product.Grid',{
		store :store,
		title : '产品管理',
		id:'productGrid',
		renderTo : 'grid-example',
		dockedItems : [ {
			xtype : 'toolbar',

			items : [ {
				xtype : 'textfield',
				name : 'name',
				id:'productName',
				fieldLabel : '关键词'
			}, {
				iconCls : 'icon-searchpp',
				text : '搜索',
				scope : this,
				handler : function(widget, event) {
					grid.getStore().load({
						params : {
							lk_name : Ext.getCmp('productName').getValue()
						}
					});
			}
			}, '->',addAction ,updateAction,delAction]
		}, {
			xtype : 'pagingtoolbar',
			dock : 'bottom',
			store : store, // GridPanel中使用的数据
			displayInfo : true
		} ],
		viewConfig : {
			stripeRows : true,
			listeners : {
				itemcontextmenu : function(view, rec, node, index, e) {
					e.stopEvent();
					contextMenu.showAt(e.getXY());
					return false;
				}
			}
		}
	});



	grid.getSelectionModel().on({
		selectionchange : function(sm, selections) {
			if (selections.length) {
				updateAction.enable();
				delAction.enable();
			} else {
				updateAction.disable();
				delAction.disable();
			}
		}
	});

});
