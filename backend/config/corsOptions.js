module.exports.corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: [ "Content-Type", "Origin", "X - Requested - With", "Content", " Accept", "Authorization" ],
    //allowedHeaders: [ "sessionId", "Content-Type" ],
    //exposedHeaders: [ "sessionId" ],
    methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    //preflightContinue: false,
};

//app.use( ( req, res, next ) => {
//     res.setHeader( "Access-Control-Allow-Origin", `${ process.env.CLIENT_URL }` );
//     res.setHeader(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//     );
//     res.setHeader(
//         "Access-Control-Allow-Methods",
//         "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//     );
//     res.setHeader( "Access-Control-Allow-Credentials", "true" );
//     next();
// } );
