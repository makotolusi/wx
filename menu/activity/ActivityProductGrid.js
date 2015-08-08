
Ext.define('activity.ActivityProductGrid', {
	extend : 'Ext.grid.Panel',
	xtype : 'grid-activity-product',
	 id:"activityProductGrid",  
	me:this,
	// <example>
	requires : [ 'Ext.grid.*', 'Ext.data.*', 'Ext.util.*', 'Ext.Action',
	   'Ext.state.*',
   		 'Ext.form.*','Ext.toolbar.*', 'activity.ActivityForm','activity.ActivityProductStore'],

	


	columnLines : true,
	multiSelect : true,
	
	initComponent : function() {
		var me = this;
		me.disable = {
				iconCls : 'action_stop',
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
            renderer: Ext.util.Format.numberRenderer('0.00'),
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
            renderer: Ext.util.Format.numberRenderer('0.00'),
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
	},{
			text : "操作",
			xtype : 'actioncolumn',
			width : 120,
			items : [ {
				iconCls: 'icon-ok',  // Use a URL in the icon config
                tooltip: '启停',
                getClass : function(v, meta, record) {
    				console.log(record.get('status'));
    				if (record.get('status') == '0') {
    					return 'icon-cancel';
    				} else {
    					return 'icon-ok';
    				}
    			},
                handler: function(grid, rowIndex, colIndex) {
                	var rec = grid.getStore().getAt(rowIndex);
    				var str = '';
    				var status=0;
    				if (rec.get('status') == '1') {
    					str = "确认停用吗?";
    					status=0;
    				} else {
    					str = "确认启用吗?";
    					status=1;
    				}
    				
    				Ext.MessageBox.confirm('确认', str, function(btn, text) {
    					  var obj={};
    					   obj.id=rec.get('id');
    					   obj.status=status
    					   console.log(obj);
    					if (btn == 'yes') {
    						Ext.Ajax.request({
    							url : ROOT_URL + '/activityext/updactivityproductstatus/6',
    							method : 'POST',
    							params :   obj,
    							success : function(response) {
    								var text = response.responseText;
    								Ext.MessageBox.alert('提示', '操作成功', function() {
    									grid.getStore().reload();
    								}, this);

    							},
    							failure : function(response) {
    								var text = response.responseText;
    								Ext.MessageBox.alert('提示', '失败-' + text, function() {
    								}, this);
    							}
    						});
    					}
    				}, this);
                }
            }]
		}] ,
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
					params :   obj,
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
		
		me.on('edit', function(editor, e) {
		   console.log(  e.record.data['rushPrice']);
		   var obj={};
		   obj.id=e.record.data['id'];
		   obj.rushQuantity=e.record.data['rushQuantity'];
		   obj.rushPrice=e.record.data['rushPrice'];
		   obj.bargainPrice=e.record.data['bargainPrice'];
		   obj.sortNum=e.record.data['sortNum'];
		   obj.status=e.record.data['status'];
		   Ext.Ajax.request({
				url : ROOT_URL + '/activityext/updactivityproduct/6',
				method : 'POST',
				params :   obj,
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
//		    e.record.commit();
		});
		this.callParent();
		
	},
	
	
});


