/**
 * This view is an example list of people.
 */
Ext.define('ErrorHandling.view.main.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'main-list',

    requires: [
        'Ext.button.Button',
        'Ext.grid.column.Action',
        'ErrorHandling.store.Users'
    ],

    title: 'Users',

    store: {
        type: 'users'
    },

    columns: [
        {
            text: 'First Name',
            dataIndex: 'fname',
            flex: 1
        },
        {
            text: 'Last Name',
            dataIndex: 'lname',
            flex: 1
        },
        {
            text: 'Age',
            dataIndex: 'age'
        },
        {
            xtype: 'actioncolumn',
            items: [{
                xtype: 'button',
                iconCls: 'x-fa fa-edit',
                handler: 'onEdit'
            },{
                xtype: 'button',
                iconCls: 'x-fa fa-minus-circle',
                handler: 'onDelete'
            }]
        }
    ],

    dockedItems: [{
        xtype: 'toolbar',
        layout: {
            pack: 'end'
        },
        items: [{
            text: 'Add new user',
            iconCls: 'x-fa fa-plus',
            handler: 'onAddUser'
        }]
    }]

});
