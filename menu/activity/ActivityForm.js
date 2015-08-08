/**
 * This example shows examples of the various supported form field types.
 */

Ext.define('activity.ActivityForm', {
    extend: 'Ext.form.Panel',
    xtype: 'form-activity',
    //<example>
    requires: [
        'Ext.form.field.*'
    ],
    id:'activity-form',
    exampleTitle: 'Form Field Types',
    //</example>

    frame: false,
    width: 400,
    bodyPadding: 10,
    layout: 'form',
	
	initComponent : function() {
		var me = this;
		var timing = {
				xtype : 'fieldcontainer',
				fieldLabel : '开始时间',
				id : 'timmingFieldContainer',
//				style : me.url == '/web/push/sendAgain' ? (me.pushType == 'TIMING' ? 'opacity:1' : 'opacity:.3') : 'opacity:.3',
//				disabled : me.url == '/web/push/sendAgain' ? (me.pushType == 'TIMING' ? false : true) : false,
				layout : 'hbox',
//				hidden : me.url == '/web/push/updateAutoConfig' ? true : false,
				combineErrors : false,
				defaults : {
					hideLabel : true
				},
				items : [{
					xtype : 'displayfield',
					value : '日期'
				}, {
					xtype : 'datefield',
					name : 'timmingDateField',
					id : 'timmingDateField',
					fieldLabel : '日期',
					format : 'Y-m-d',
//					disabled : me.url == '/web/push/sendAgain' ? (me.pushType == 'TIMING' ? false : true) : true,
					value : me.rushBeginTime==''||me.rushBeginTime==undefined||me.rushBeginTime==null?'':me.rushBeginTime.split(' ')[0],
					padding : '0 0 0 10',
					allowBlank : false,
					width : 120
				}, {
					xtype : 'displayfield',
					padding : '0 0 0 10',
					value : '时间'
				}, {
					xtype : 'timefield',
					name : 'timmingField',
//					disabled : me.url == '/web/push/sendAgain' ? (me.pushType == 'TIMING' ? false : true) : true,
					id : 'timmingField',
					fieldLabel : '时间',
					// minValue : '8:00 AM',
					// maxValue : '10:00 PM',
//					increment : 30,
					format:'H:i:s' ,
					value : me.rushBeginTime==''||me.rushBeginTime==undefined||me.rushBeginTime==null?'':me.rushBeginTime.split(' ')[1],
					allowBlank : false,
					width : 100,
					padding : '0 0 0 10',
					anchor : '100%'
				}]
			};
		
		var timing_end = {
				xtype : 'fieldcontainer',
				fieldLabel : '结束时间',
				id : 'timmingFieldContainer_end',
//				style : me.url == '/web/push/sendAgain' ? (me.pushType == 'TIMING' ? 'opacity:1' : 'opacity:.3') : 'opacity:.3',
//				disabled : me.url == '/web/push/sendAgain' ? (me.pushType == 'TIMING' ? false : true) : false,
				layout : 'hbox',
//				hidden : me.url == '/web/push/updateAutoConfig' ? true : false,
				combineErrors : false,
				defaults : {
					hideLabel : true
				},
				items : [{
					xtype : 'displayfield',
					value : '日期'
				}, {
					xtype : 'datefield',
					name : 'timmingDateField_end',
					id : 'timmingDateField_end',
					fieldLabel : '日期',
					format : 'Y-m-d',
//					disabled : me.url == '/web/push/sendAgain' ? (me.pushType == 'TIMING' ? false : true) : true,
					value : me.rushEndTime==undefined|| me.rushEndTime==''|| me.rushEndTime==null?'':me.rushEndTime.split(' ')[0],
					padding : '0 0 0 10',
					allowBlank : false,
					width : 120
				}, {
					xtype : 'displayfield',
					padding : '0 0 0 10',
					value : '时间'
				}, {
					xtype : 'timefield',
					name : 'timmingField_end',
//					disabled : me.url == '/web/push/sendAgain' ? (me.pushType == 'TIMING' ? false : true) : true,
					id : 'timmingField_end',
					fieldLabel : '时间',
					// minValue : '8:00 AM',
					// maxValue : '10:00 PM',
//					increment : 30,
					format:'H:i:s' ,
					value : me.rushEndTime==undefined|| me.rushEndTime==''|| me.rushEndTime==null?'':me.rushEndTime.split(' ')[1],
					allowBlank : false,
					width : 100,
					padding : '0 0 0 10',
					anchor : '100%'
				}]
			};
		Ext.apply(this, {
			items: [{
		        xtype: 'textfield',
		        name: 'activityName',
		        fieldLabel: '活动名称',
		    	allowBlank : false,
		        value : me.activityName
		    },{
		        xtype: 'textfield',
		        name: 'specialName',
		    	allowBlank : false,
		        fieldLabel: '专场名称',
		        value : me.specialName,
		    }, {
		        xtype: 'textareafield',
		        name: 'description',
		        fieldLabel: '描述',
		        value : me.description
		    },
//		    {
//		        xtype: 'datefield',
//		        name: 'rushBeginTime',
//		        fieldLabel: '抢购开始时间',
////		        minValue: '1:30 AM',
////		        maxValue: '9:15 PM',
//		        value : me.rushBeginTime
//		        
//		    }
		    ,timing, timing_end,{
		        xtype: 'textfield',
		        name: 'imgUrl',
		        fieldLabel: '图片地址',
		        value : me.imgUrl,
		    	allowBlank : false
		    }]
		});
		this.callParent();
	},
	buttons : [{
		text : '提交',
		id : 'sendbtn',
		handler : function() {
			var me = this;
			var form = Ext.getCmp('activity-form');
			var formValue = form.getValues();
			console.log(form.activityId);
			formValue.rushBeginTime=formValue.timmingDateField+" "+formValue.timmingField;
			formValue.rushEndTime=formValue.timmingDateField_end+" "+formValue.timmingField_end;
			formValue.id=form.activityId;
			formValue.rushStatus=form.rushStatus;
			console.log(formValue);
			if (form.isValid()) {
				
				Ext.Ajax.request({
					url : ROOT_URL + '/activityext/save',
					method : 'POST',
					params : formValue,
					success : function(response) {
						var text = response.responseText;
						Ext.MessageBox.alert('提示', '创建成功', function() {
							var p = Ext.getCmp('activityGrid');
								p.getStore().reload();
								Ext.getCmp('activity-update-win').close();

						}, this);

					},
					failure : function(response) {
						var text = response.responseText;
						Ext.MessageBox.alert('提示', '创建失败:' + text, function() {
							var p = Ext.getCmp('activityGrid');
							p.getStore().reload();
							Ext.getCmp('activity-update-win').close();
						}, this);
					}
				});
			}
		}
	}]
    
});
