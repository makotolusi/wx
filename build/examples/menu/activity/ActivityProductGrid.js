
Ext.define('activity.ActivityProductGrid', {
	extend : 'Ext.grid.Panel',
	xtype : 'grid-activity-product',
	 id:"activityProductGrid",  
	me:this,
	// <example>
	requires : [ 'Ext.grid.*', 'Ext.data.*', 'Ext.util.*', 'Ext.Action',
	   'Ext.state.*',
   		 'Ext.form.*','Ext.toolbar.*', 'form.FieldTypes' ,'activity.ActivityProductStore'],

	


	columnLines : true,
	multiSelect : true,
	
	initComponent : function() {
		var me = this;
		me.disable = {
			// iconCls : 'action_stop',
			id : 'user-disable',
			// tooltip : '停用',
			getClass : function(v, meta, record) {
				console.log(record);
				if (record.get('status') == 'ON') {
					this.items[2].tooltip = '停用';
					return 'action_stop';
				} else {
					return 'action_go';
				}
			},
			handler : function(grid, rowIndex, colIndex) {
				var rec = grid.getStore().getAt(rowIndex);
			console.log(rec);
			}
		};
		
		Ext.apply(this, {
			columns : [ {
		text : '产品代码',
		width : 100,
		sortable : false,
		dataIndex : 'productCode'
	}, {
		text : '产品名称',
		width : 100,
		sortable : false,
		dataIndex : 'productName'
	}, {
		text : '价格',
		sortable : false,
            width: 130,
            editor: {
                xtype: 'numberfield',
                allowBlank: false
            },
		dataIndex : 'rushPrice'
	},  {
		text : '优惠',
		width : 70,
		sortable : false,
		  format: '$0,0',
		       editor: {
                xtype: 'numberfield',
                allowBlank: false
            },
		dataIndex : 'bargainPrice'
	},{
		text : '抢购数量',
		width : 100,
		sortable : false,
		     editor: {
                xtype: 'numberfield',
                allowBlank: false
            },
		dataIndex : 'rushQuantity'
	}, {
		text : '排序',
		width : 100,
		sortable : false,
		     editor: {
                xtype: 'numberfield',
                allowBlank: false
            },
		dataIndex : 'sortNum'
	},  {
            header: '状态',
            dataIndex: 'status',
            width: 60,
            editor: {
                xtype: 'checkbox',
                cls: 'x-grid-checkheader-editor'
            }
        },me.disable ],
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
   plugins: Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToMoveEditor: 1,
        autoCancel: false
    }),
	stateful : false
		});
		this.callParent();
	},
	
	
});


