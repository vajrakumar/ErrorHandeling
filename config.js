var AppConfig = {

    //connection details for database
    db: {
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            user: 'postgres',
            password: '1',
            database: 'users_directory',
            charset: 'utf8'
        }
    },

    //when true returns internal error description to client app
    enableErrorDescription: true

};

module.exports = AppConfig;