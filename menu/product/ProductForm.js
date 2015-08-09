
Ext.define('product.ProductForm', {
    extend: 'Ext.form.Panel',
    xtype: 'form-product',
    //<example>
    requires: [
        'Ext.form.field.*'
    ],
    id:'product-form',
    exampleTitle: 'Form Field Types',
    //</example>

    frame: false,
    width: 300,
    bodyPadding: 10,
    layout: 'form',
    autoScroll:true,
	initComponent : function() {
		var me = this;
		// The data store containing the list of states
		// Create the combo box, attached to the states data store
		var currency=Ext.create('Ext.form.ComboBox', {
		    fieldLabel: '货币类型',
		    store:  Ext.create('Ext.data.Store', {
			    fields: ['abbr', 'name'],
			    data : [
			        {"abbr":"US", "name":"美元"},
			        {"abbr":"AK", "name":"日元"},
			        {"abbr":"CN", "name":"人民币"}
			        //...
			    ]
			}),
		    queryMode: 'local',
		    name: 'currency',
		    displayField: 'name',
		    value : me.currency,
		    valueField: 'abbr'
		});
		console.log( me.piece);
		var piece=Ext.create('Ext.form.ComboBox', {
		    fieldLabel: '板块类型',
		    store:  Ext.create('piece.PieceStore', {
			}),
		    queryMode: 'local',
		    name: 'piece',
		    displayField: 'text',
		    valueField: 'id'
		});
		if(me.piece!=undefined)
		piece.setValue(Number(me.piece));
		var pieceCategory=Ext.create('Ext.form.ComboBox', {
		    fieldLabel: '分类',
		    store:  Ext.create('type.TypeStore', {
			}),
		    queryMode: 'local',
		    name: 'pieceCategory',
		    displayField: 'typeName',
		    valueField: 'id'
		});
		if(me.piece!=undefined)
		pieceCategory.setValue(Number(me.pieceCategory));
		Ext.apply(this, {
			items: [{
		        xtype: 'textfield',
		        name: 'systemName',
		        fieldLabel: '系统名称',
		    	allowBlank : false,
		        value : me.systemName
		    },{
		        xtype: 'textfield',
		        name: 'name',
		    	allowBlank : false,
		        fieldLabel: '产品名称',
		        value : me.name,
		    },{
		        xtype: 'textfield',
		        name: 'productCode',
		    	allowBlank : false,
		        fieldLabel: '代码',
		        value : me.productCode,
		    },{
		        xtype: 'textfield',
		        name: 'price',
		    	allowBlank : false,
		        fieldLabel: '价格',
		        value : me.price,
		    },  {
		        xtype: 'textareafield',
		        name: 'description',
		        fieldLabel: '产品描述',
		        value : me.description
		    }, {
		        xtype: 'textareafield',
		        name: 'experience',
		        fieldLabel: '用户体验',
		        value : me.experience
		    },currency,{
		        xtype: 'numberfield',
		        name: 'quantity',
		        minValue: 0,
		        fieldLabel: '部件数量',
		        value : me.quantity
		    },{
		        xtype: 'numberfield',
		        name: 'total',
		        fieldLabel: '总数',
		        minValue: 0,
		        value : me.total
		    },pieceCategory,piece,{
		        xtype: 'textfield',
		        name: 'picUrl1',
		        fieldLabel: '图片地址1',
		        value : me.picUrl1,
		    },{
		        xtype: 'textfield',
		        name: 'picUrl2',
		        fieldLabel: '图片地址2',
		        value : me.picUrl2,
		    },{
		        xtype: 'textfield',
		        name: 'picUrl3',
		        fieldLabel: '图片地址3',
		        value : me.picUrl3,
		    },{
		        xtype: 'textfield',
		        name: 'picUrl4',
		        fieldLabel: '图片地址4',
		        value : me.picUrl4,
		    },{
		        xtype: 'textfield',
		        name: 'picUrl5',
		        fieldLabel: '图片地址5',
		        value : me.picUrl5,
		    },{
		        xtype: 'textfield',
		        name: 'picUrl6',
		        fieldLabel: '图片地址6',
		        value : me.picUrl6,
		    },{
		        xtype: 'textfield',
		        name: 'picUrl7',
		        fieldLabel: '图片地址7',
		        value : me.picUrl7,
		    },{
		        xtype: 'textfield',
		        name: 'picUrl8',
		        fieldLabel: '图片地址8',
		        value : me.picUrl8
		    },{
		        xtype: 'textfield',
		        name: 'picUrl9',
		        fieldLabel: '图片地址9',
		        value : me.picUrl9,
		    },{
		        xtype: 'textfield',
		        name: 'picUrl10',
		        fieldLabel: '图片地址10',
		        value : me.picUrl10,
		    }]
		});
		this.callParent();
	},
	buttons : [{
		text : '提交',
		id : 'sendbtn',
		handler : function() {
			var me = this;
			var form = Ext.getCmp('product-form');
			var formValue = form.getValues();
			formValue.id=form.pid;
			console.log(formValue);
			if (form.isValid()) {
				
				Ext.Ajax.request({
					url : ROOT_URL + '/productMaintenance/save',
					method : 'POST',
					params : formValue,
					success : function(response) {
						var text = response.responseText;
						Ext.MessageBox.alert('提示', '创建成功', function() {
							var p = Ext.getCmp('productGrid');
								p.getStore().reload();
								Ext.getCmp('product-update-win').close();

						}, this);

					},
					failure : function(response) {
						var text = response.responseText;
						Ext.MessageBox.alert('提示', '创建失败:' + text, function() {
							var p = Ext.getCmp('productGrid');
							p.getStore().reload();
							Ext.getCmp('product-update-win').close();
						}, this);
					}
				});
			}
		}
	}]
    
});
