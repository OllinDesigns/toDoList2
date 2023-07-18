import express from 'express';
import path from 'path';
import toDoController from './src/application/controllers/toDoController';

const app = express();
const rootDir = path.join(__dirname, '..'); // Get the root directory

// Static files
app.use(express.static(path.join(rootDir, 'public')));

// Fire controllers
toDoController(app);

// Route to serve index.html
app.get('/index.html', (req, res) => {
  res.sendFile(path.join(rootDir, 'index.html'));
});

// Listen to port
app.listen(3000, () => {
  console.log('Gurrus says hello from port 3000');
});






// import express from 'express';
// import path from 'path';
// import toDoController from './src/application/controllers/toDoController';

// const app = express();

// // Set the views directory
// app.set('views', path.join(__dirname, 'views'));

// // Set the view engine
// app.set('view engine', 'ejs');

// // Static files
// app.use(express.static(path.join(__dirname, 'public')));

// // Fire controllers
// toDoController(app);

// // Listen to port
// app.listen(3000, () => {
//   console.log('Gurrus says hello from port 3000');
// });


// this works with toDoController.ejs but it wouldt load the styles
// import express from 'express';
// import path from 'path';
// import toDoController from './src/application/controllers/toDoController';

// const app = express();

// // Set the views directory
// app.set('views', path.join(__dirname, 'dist', 'src', 'views'));

// // Set the view engine
// app.set('view engine', 'ejs');

// // Static files
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/public', express.static(path.join(__dirname, './public'))); // Additional static middleware to serve the 'public' folder/ propuesta juan carlos, no parece funcionar

// // Fire controllers
// toDoController(app);

// // Listen to port
// app.listen(3000, () => {
//   console.log('Gurrus says hello from port 3000');
// });



// import express from 'express';
// import toDoController from './src/application/controllers/toDoController';

// const app = express();

// // set up template engine
// app.set('view engine', 'ejs');

// // static files
// app.use(express.static('public'));

// // fire controllers
// toDoController(app);

// // listen to port
// app.listen(3000, () => {
//   console.log('Gurrus says hello from port 3000');
// });
