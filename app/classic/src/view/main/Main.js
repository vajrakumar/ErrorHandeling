Ext.define('ErrorHandling.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [
        'ErrorHandling.view.main.Form',
        'ErrorHandling.view.main.List',
        'ErrorHandling.view.main.MainController',
        'Ext.layout.container.Card'
    ],

    controller: 'main',

    layout: {
        type: 'card'
    },

    items: [{
        xtype: 'main-list'
    },{
        xtype: 'main-form'
    }]
});
