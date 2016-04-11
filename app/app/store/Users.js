Ext.define('ErrorHandling.store.Users', {
    extend: 'Ext.data.Store',

    alias: 'store.users',

    requires: [
        'Ext.data.proxy.Rest'
    ],

    storeId: 'users',
    autoLoad: true,
    autoSync: true,

    fields: [
        'fname', 'lname', 'age'
    ],

    proxy: {
        type: 'rest',
        api: {
            read: '/users',
            create: '/user/create',
            update: '/user/update',
            destroy: '/user/destroy'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        listeners: {
            exception: function (proxy, request, operation, e) {
                Ext.Msg.alert('Failed', Ext.JSON.decode(request.responseText).message || request.statusText);
            }
        }
    }

});
