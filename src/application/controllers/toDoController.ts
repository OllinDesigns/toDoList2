import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Connect to the database
mongoose
  .connect('mongodb+srv://ollinDesigns:claveParaAtlas@cluster0.1b2ylxi.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Create a schema, like a blueprint
const toDoSchema = new mongoose.Schema({
  item: String,
});

// Create a model
const Todo = mongoose.model('Todo', toDoSchema);

export default function toDoController(app: any) {
  app.get('/todo', (req: Request, res: Response) => {
    // Get data from MongoDB and return it as JSON
    Todo.find({})
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.error('Error retrieving data from MongoDB:', err);
        res.status(500).send('Internal Server Error');
      });
  });


  app.post('/todo', urlencodedParser, (req: Request, res: Response) => {
    // Get data from the view and add it to MongoDB
    const newTodo = new Todo({
      item: req.body.item,
    });
  
    console.log('Received data from the frontend:', newTodo); // Log the received data
  
    newTodo
      .save()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.error('Error saving data to MongoDB:', err);
        res.status(500).send('Internal Server Error');
      });
  });
  


  // app.post('/todo', urlencodedParser, (req: Request, res: Response) => {
  //   // Get data from the view and add it to MongoDB
  //   const newTodo = new Todo({
  //     item: req.body.item,
  //   });

  //   newTodo
  //     .save()
  //     .then((data) => {
  //       res.json(data);
  //     })
  //     .catch((err) => {
  //       console.error('Error saving data to MongoDB:', err);
  //       res.status(500).send('Internal Server Error');
  //     });
  // });

  app.delete('/todo', (req: Request, res: Response) => {
    // Delete the requested item from MongoDB
    Todo.findOneAndDelete({ item: req.params.item.replace(/-/g, '') })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.error('Error deleting data from MongoDB:', err);
        res.status(500).send('Internal Server Error');
      });
  });
}


// import { Request, Response } from 'express';
// import bodyParser from 'body-parser';
// import mongoose from 'mongoose';
// import path from 'path';

// const urlencodedParser = bodyParser.urlencoded({ extended: false });

// // Connect to the database
// mongoose
//   .connect('mongodb+srv://ollinDesigns:claveParaAtlas@cluster0.1b2ylxi.mongodb.net/?retryWrites=true&w=majority')
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((err) => {
//     console.error('Error connecting to MongoDB:', err);
//   });

// // Create a schema, like a blueprint
// const toDoSchema = new mongoose.Schema({
//   item: String,
// });

// // Create a model
// const Todo = mongoose.model('Todo', toDoSchema);

// export default function toDoController(app: any) {
//   app.get('/todo', (req: Request, res: Response) => {
//     // Get data from MongoDB and pass it to the view
//     Todo.find({})
//       .then((data) => {
//         const viewPath = path.join(__dirname, '../views/todo.ejs');
//         res.render(viewPath, { todos: data });
//       })
//       .catch((err) => {
//         console.error('Error retrieving data from MongoDB:', err);
//         res.status(500).send('Internal Server Error');
//       });
//   });

//   app.post('/todo', urlencodedParser, (req: Request, res: Response) => {
//     // Get data from the view and add it to MongoDB
//     const newTodo = new Todo({
//       item: req.body.item,
//     });

//     newTodo
//       .save()
//       .then((data) => {
//         res.json(data);
//       })
//       .catch((err) => {
//         console.error('Error saving data to MongoDB:', err);
//         res.status(500).send('Internal Server Error');
//       });
//   });

//   app.delete('/todo', (req: Request, res: Response) => {
//     // Delete the requested item from MongoDB
//     Todo.findOneAndDelete({ item: req.params.item.replace(/-/g, '') })
//       .then((data) => {
//         res.json(data);
//       })
//       .catch((err) => {
//         console.error('Error deleting data from MongoDB:', err);
//         res.status(500).send('Internal Server Error');
//       });
//   });
// }


// import { Request, Response } from 'express';
// import bodyParser from 'body-parser';
// import mongoose from 'mongoose';
// import path from 'path';

// const urlencodedParser = bodyParser.urlencoded({ extended: false });

// // Connect to the database
// mongoose.connect('mongodb+srv://ollinDesigns:claveParaAtlas@cluster0.1b2ylxi.mongodb.net/?retryWrites=true&w=majority')
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((err) => {
//     console.error('Error connecting to MongoDB:', err);
//   });

// // Create a schema, like a blueprint
// const toDoSchema = new mongoose.Schema({
//   item: String
// });

// // Create a model
// const Todo = mongoose.model('Todo', toDoSchema);

// export default function toDoController(app: any) {
//   app.get('/todo', (req: Request, res: Response) => {
//     // Get data from MongoDB and pass it to the view
//     Todo.find({})
//       .then((data) => {
//         const viewPath = path.join(__dirname, '../../views/todo.ejs');
//         res.render(viewPath, { todos: data });
//         // res.render('todo', { todos: data });
//       })
//       .catch((err) => {
//         console.error('Error retrieving data from MongoDB:', err);
//         res.status(500).send('Internal Server Error');
//       });
//   });

//   app.post('/todo', urlencodedParser, (req: Request, res: Response) => {
//     // Get data from the view and add it to MongoDB
//     const newTodo = new Todo({
//       item: req.body.item
//     });

//     newTodo.save()
//       .then((data) => {
//         res.json(data);
//       })
//       .catch((err) => {
//         console.error('Error saving data to MongoDB:', err);
//         res.status(500).send('Internal Server Error');
//       });
//   });

//   app.delete('/todo', (req: Request, res: Response) => {
//     // Delete the requested item from MongoDB
//     Todo.findOneAndDelete({ item: req.params.item.replace(/\-/g, '') })
//       .then((data) => {
//         res.json(data);
//       })
//       .catch((err) => {
//         console.error('Error deleting data from MongoDB:', err);
//         res.status(500).send('Internal Server Error');
//       });
//   });
// }



// import { Request, Response } from 'express';
// import bodyParser from 'body-parser';
// import mongoose, { Document } from 'mongoose';

// // Connect to database
// mongoose.connect('mongodb+srv://ollinDesigns:claveParaAtlas@cluster0.1b2ylxi.mongodb.net/?retryWrites=true&w=majority');

// // Create a schema, like a blueprint
// const toDoSchema = new mongoose.Schema({
//   item: String
// });

// // Create a model
// interface ITodo extends Document {
//   item: string;
// }

// const Todo = mongoose.model<ITodo>('Todo', toDoSchema);

// export default function toDoController(app: any) {
//   app.use(bodyParser.urlencoded({ extended: true }));

//   app.get('/todo', function(req: Request, res: Response) {
//     // Get data from MongoDB and pass it to the view
//     Todo.find({}, function(err: Error, data: ITodo[]) {
//       if (err) throw err;
//       res.render('todo', { todos: data });
//     });
//   });

//   app.post('/todo', function(req: Request, res: Response) {
//     // Get data from the view and add it to MongoDB
//     const newTodo = new Todo(req.body);
//     newTodo.save()
//       .then((data: ITodo) => {
//         res.json(data);
//       })
//       .catch((err: Error) => {
//         throw err;
//       });
//   });

//   app.delete('/todo', function(req: Request, res: Response) {
//     // Delete the requested item from MongoDB
//     Todo.findOneAndDelete({ item: req.params.item.replace(/\-/g, '') })
//       .then((data: ITodo | null) => {
//         if (data) {
//           res.json(data);
//         } else {
//           res.status(404).json({ error: 'Item not found' });
//         }
//       })
//       .catch((err: Error) => {
//         throw err;
//       });
//   });
// }
