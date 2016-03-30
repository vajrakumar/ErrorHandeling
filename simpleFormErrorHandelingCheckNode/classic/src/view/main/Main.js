/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('simpleFormErrorHandelingCheckNode.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'simpleFormErrorHandelingCheckNode.view.main.MainController',
        'simpleFormErrorHandelingCheckNode.view.main.MainModel',
        'simpleFormErrorHandelingCheckNode.view.main.List',
        'simpleFormErrorHandelingCheckNode.view.main.Form'
    ],

    controller: 'main',
    viewModel: 'main',

   /* header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            bind: {
                text: '{name}'
            },
            flex: 0
        }
    },
*/
    title:'Users Entry',


    items: [{
        xtype: 'myForm'
    },{
        xtype: 'mainlist'
    }]
});
