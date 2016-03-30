/**
 * Created by vajra on 29/03/16.
 */
Ext.define('simpleFormErrorHandelingCheckNode.view.main.Form', {
    extend: 'Ext.form.Panel',

    //title:"User",
    xtype: 'myForm',
    url: '/addUser',
    items: [
        {
            xtype: 'textfield',
            fieldLabel: 'First Name'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Last Name'
        }
    ],
    buttons: [
        {
            text: 'Save',
            handler: 'saveUser'
        },
        {
            text: 'Reset',
            handler: 'resetForm'
        }
    ]
});