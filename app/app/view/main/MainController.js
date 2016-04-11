Ext.define('ErrorHandling.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    requires: [
        'Ext.data.StoreManager'
    ],

    onAddUser: function (sender) {
        var panel = sender.up('panel').up('panel');
        var formpanel = panel.getLayout().getLayoutItems()[1];
        formpanel.setTitle('Add new user');
        formpanel.reset();
        var saveBtn = formpanel.down('#saveBtn');
        saveBtn.setText('Save');
        saveBtn.setHandler('onSaveUser');
        formpanel.down('#resetBtn').show();
        panel.setActiveItem(1);
    },

    onEdit: function (grid, rowIndex, colIndex) {
        var panel = grid.up('panel').up('panel');
        var formpanel = panel.getLayout().getLayoutItems()[1];
        formpanel.setTitle('Edit user');
        formpanel.loadRecord(grid.getStore().getAt(rowIndex));
        var saveBtn = formpanel.down('#saveBtn');
        saveBtn.setText('Update');
        saveBtn.setHandler('onUpdateUser');
        formpanel.down('#resetBtn').hide();
        panel.setActiveItem(1);
    },

    onDelete: function (grid, rowIndex, colIndex) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', function (choice) {
            if (choice === 'yes') {
                grid.getStore().removeAt(rowIndex);
            }
        });
    },

    onSaveUser: function (sender) {
        var formpanel = sender.up('form');
        if (formpanel.isValid()) {
            formpanel.submit({
                url: '/user/create',
                success: function (form, action) {
                    formpanel.up('panel').setActiveItem(0);
                    Ext.data.StoreManager.lookup('users').load();
                },
                failure: function (form, action) {
                    Ext.Msg.alert('Failed', action.result.message);
                }
            });
        }
    },

    onUpdateUser: function(sender){
        var formpanel = sender.up('form');
        if (formpanel.isValid()) {
            formpanel.submit({
                url: '/user/update',
                success: function (form, action) {
                    formpanel.up('panel').setActiveItem(0);
                    Ext.data.StoreManager.lookup('users').load();
                },
                failure: function (form, action) {
                    Ext.Msg.alert('Failed', action.result.message);
                }
            });
        }
    },

    onResetForm: function (sender) {
        sender.up('form').reset();
    },

    onCancel: function (sender) {
        sender.up('form').up('panel').setActiveItem(0);
    }

});
