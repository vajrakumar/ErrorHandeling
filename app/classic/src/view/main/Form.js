/**
 * Created by vajra on 29/03/16.
 */
Ext.define('ErrorHandling.view.main.Form', {
    extend: 'Ext.form.Panel',
    xtype: 'main-form',

    requires: [
        'Ext.form.field.Hidden',
        'Ext.form.field.Number',
        'Ext.form.field.Text',
        'Ext.layout.container.Form'
    ],

    layout: {
        type: 'form'
    },

    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'textfield',
            name: 'fname',
            fieldLabel: 'First Name',
            allowBlank: false
        }, {
            xtype: 'textfield',
            name: 'lname',
            fieldLabel: 'Last Name',
            allowBlank: false
        },
        {
            xtype: 'numberfield',
            name: 'age',
            fieldLabel: 'Age',
            allowBlank: false,
            maxValue: 99,
            minValue: 0
        }
    ],

    buttons: [
        {
            id: 'saveBtn'
        },
        {
            text: 'Reset',
            handler: 'onResetForm'
        },
        {
            text: 'Cancel',
            handler: 'onCancel'
        }
    ]
});