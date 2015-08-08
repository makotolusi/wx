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

    exampleTitle: 'Form Field Types',
    //</example>

    frame: true,
    width: 400,
    bodyPadding: 10,
    layout: 'form',

    items: [{
        xtype: 'textfield',
        name: 'textfield1',
        fieldLabel: '活动名称',
        value: 'Text field value'
    },{
        xtype: 'textfield',
        name: 'textfield1',
        fieldLabel: '专场名称',
        value: 'Text field value'
    }, {
        xtype: 'textareafield',
        name: 'textarea1',
        fieldLabel: '描述',
        value: 'Textarea value'
    },{
        xtype: 'datefield',
        name: 'time1',
        fieldLabel: '抢购开始时间',
        minValue: '1:30 AM',
        maxValue: '9:15 PM'
    }, {
        xtype: 'datefield',
        name: 'time1',
        fieldLabel: '抢购结束时间',
        minValue: '1:30 AM',
        maxValue: '9:15 PM'
    },{
        xtype: 'textfield',
        name: 'textfield1',
        fieldLabel: '图片地址',
        value: 'Text field value'
    }]
});
