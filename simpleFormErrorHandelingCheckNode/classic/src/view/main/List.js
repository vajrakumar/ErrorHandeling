/**
 * This view is an example list of people.
 */
Ext.define('simpleFormErrorHandelingCheckNode.view.main.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'mainlist',

    requires: [
        'simpleFormErrorHandelingCheckNode.store.Personnel'
    ],
    title:'Users',
    store: {
        type: 'personnel'
    },

    columns: [
        { text: 'First Name',  dataIndex: 'fname' , flex: 1},
        { text: 'Last Name', dataIndex: 'lname', flex: 1 },
        { text: 'Age', dataIndex: 'age' }
    ],

    listeners: {
        select: 'onItemSelected'
    }
});
