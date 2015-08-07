/**
 * This example shows examples of the various supported form field types.
 */
Ext.require([ 'product.ProductStore']);

Ext.define('product.Grid', {
	extend : 'Ext.grid.Panel',
	xtype : 'grid-product',
	 id:"productGrid",  
	me:this,
	// <example>
	requires : [ 'Ext.grid.*', 'Ext.data.*', 'Ext.util.*', 'Ext.Action',
			'Ext.data.*', 'Ext.toolbar.*', 'form.FieldTypes' ],

	


	columnLines : true,
	multiSelect : true,
	columns : [ {
		text : '产品代码',
		width : 100,
		sortable : false,
		dataIndex : 'productCode'
	}, {
		text : '产品名称',
		width : 100,
		sortable : false,
		dataIndex : 'name'
	}, {
		text : '价格',
		width : 70,
		sortable : false,
		formatter : 'usMoney',
		dataIndex : 'price'
	}, {
		text : '描述',
		width : 100,
		sortable : false,
		dataIndex : 'description'
	}, {
		text : '数量',
		width : 70,
		sortable : false,
		dataIndex : 'quantity'
	}, {
		text : '系统名称',
		width : 100,
		sortable : false,
		dataIndex : 'systemName'
	}, {
		text : '创建时间',
		width : 100,
		sortable : false,
		dataIndex : 'entertime'
	} ],
	dockedItems : [ {
		xtype : 'toolbar',

		items : [ {
			xtype : 'textfield',
			name : 'name',
			fieldLabel : '关键词'
		}, {
			iconCls : 'icon-add',
			text : '搜索',
			scope : this,
			handler : this.onAddClick
		}, '->', Ext.create('Ext.Action', {
			icon : '../shared/icons/fam/add.gif', // Use a URL in the icon
			text : '绑定',
			id:'bindBtn',
			disabled : true,
			handler : function(widget, event) {
				var obj={};
				var pGrid=Ext.getCmp('productGrid');
				var pRows=pGrid.getSelectionModel().getSelection();
				var pids='';
				var pcodes='';
						for (var i = 0; i < pRows.length; i++) {
							pids+=pRows[i].get('id')+",";
								pcodes+=pRows[i].get('productCode')+",";
						
						}
				obj.activityId=pGrid.activityId;
				obj.productIds=pids;
				obj.productCodes=pcodes;
						console.log(obj);
				Ext.Ajax.request({
					url : ROOT_URL + '/activityext/yesguanlianproduct',
					method : 'POST',
					params :   {activityId: 6, productIds: "1", productCodes: "M000001"},
					success : function(response) {
						var text = response.responseText;
						console.log(text);
						Ext.MessageBox.alert('提示', '创建成功', function() {
							win.close();
						}, this);

					},
					failure : function(response) {
						var text = response.responseText;
						console.log(text);
						Ext.MessageBox.alert('提示', '创建失败-' + text, function() {
							win.close();
						}, this);
					}
				});
			}
		}) ]
	}, {
		xtype : 'pagingtoolbar',
		dock : 'bottom',
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
	},

	stateful : false
});


