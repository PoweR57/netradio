module.exports = {
    app: {
        baseUrl: process.env.BASE_URL || "localhost",
        port: process.env.PORT || 3000,
        production: process.env.NODE_ENV ? true : false
    },
    icecast: {
        
    }
};