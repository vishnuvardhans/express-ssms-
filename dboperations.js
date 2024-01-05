// // var config = {  
// //     server: 'LAPTOP-KDV8TRE9\SQLEXPRESS.database.windows.net',  //update me
// //     authentication: {
// //         type: 'default',
// //         options: {
// //             userName: 'LAPTOP-KDV8TRE9\Vishnuvardhan',  //update me
// //         }
// //     },
// //     options: {
// //         // If you are on Microsoft Azure, you need encryption:
// //         encrypt: true,
// //         database: 'database'  //update me
// //     }
// // }; 
// // var connection = new Connection(config);  
// // console.log(config);
// // connection.on('connect', function(err) {  
// //     // If no error, then good to proceed.
// //     console.log(err);
// //     console.log("Connected");  
// // });
// // connection.on('connect', function(err) {  
// //     if (err) {
// //         console.error(err.message);
// //     } else {
// //         console.log("Connected");
// //     }
// // });

// // connection.connect();
// const { Connection } = require('tedious');

// const config = {  
//     server: 'LAPTOP-KDV8TRE9\\SQLEXPRESS',  // update me
//     authentication: {
//         type: 'default',
//         options: {
//             userName: 'LAPTOP-KDV8TRE9\\Vishnuvardhan',  // update me
//             // No password for Windows Authentication
//         }
//     },
//     options: {
//         encrypt: true,
//         database: 'your_database_name_here',  // update me
//         trustServerCertificate: true,
//         enableArithAbort: true,
//         integratedSecurity: true,
//     }
// };

// const connection = new Connection(config);

// // Log when the connection is being established
// console.log("Connecting to the database...");

// // Log the configuration
// console.log("Configuration:", config);

// // Handle connection errors
// connection.on('error', function(err) {
//     console.error("Connection error:", err.message);
// });

// // Handle connection close
// connection.on('end', function() {
//     console.log("Connection closed.");
// });

// // Attempt to connect
// connection.connect(function(err) {
//     if (err) {
//         console.error("Connection initiation error:", err.message);
//     } else {
//         console.log("Connected successfully");
//         // Perform your database operations here
//     }
// });
