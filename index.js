const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express();
const bodyParser = require("body-parser");

app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

  // parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;
const SystemEntityType = db.systemEntityType;

var mongoose = require("mongoose");

var MONGODB_URI = process.env.MONGODB_URL || "mongodb+srv://kompanietst:Rjnbyzgfkrf123@cluster0.xazd5.mongodb.net/scribblang";
const options = {
  // useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
  // family: 4 // Use IPv4, skip trying IPv6
};
mongoose.connect(MONGODB_URI,options)

// db.mongoose
//     .connect(`mongodb+srv://kompanietst:Rjnbyzgfkrf123@cluster0.xazd5.mongodb.net/scribblang`, {
//         // .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })
//     .then(() => {
//         console.log("Successfully connect to MongoDB.");
//         initial();
//     })
//     .catch(err => {
//         console.error("Connection error", err);
//         process.exit();
//     });


// function initial() {
//     Role.estimatedDocumentCount((err, count) => {
//         if (!err && count === 0) {
//             new Role({
//                 name: "user"
//             }).save(err => {
//                 if (err) {
//                     console.log("error", err);
//                 }

//                 console.log("added 'user' to roles collection");
//             });

//             new Role({
//                 name: "moderator"
//             }).save(err => {
//                 if (err) {
//                     console.log("error", err);
//                 }

//                 console.log("added 'moderator' to roles collection");
//             });

//             new Role({
//                 name: "admin"
//             }).save(err => {
//                 if (err) {
//                     console.log("error", err);
//                 }

//                 console.log("added 'admin' to roles collection");
//             });
//         }
//     });

//     SystemEntityType.estimatedDocumentCount((err, count) => {
//         if (!err && count === 0) {
//             new SystemEntityType({
//                 name: "folder"
//             }).save(err => {
//                 if (err) {
//                     console.log("error", err);
//                 }

//                 console.log("added 'folder' to roles collection");
//             });

//             new SystemEntityType({
//                 name: "list"
//             }).save(err => {
//                 if (err) {
//                     console.log("error", err);
//                 }

//                 console.log("added 'list' to roles collection");
//             });

//         }
//     });
// }

// // simple route
// app.get("/", (req, res) => {
//     res.json({ message: "Welcome to bezkoder application." });
// });

// // routes
// require('./app/routes/auth.routes')(app);
// require('./app/routes/user.routes')(app);
// require('./app/routes/word.routes')(app);
// require('./app/routes/systemEntity.routes')(app);

