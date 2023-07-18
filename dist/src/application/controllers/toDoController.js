"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const urlencodedParser = body_parser_1.default.urlencoded({ extended: false });
mongoose_1.default
    .connect('mongodb+srv://ollinDesigns:claveParaAtlas@cluster0.1b2ylxi.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});
const toDoSchema = new mongoose_1.default.Schema({
    item: String,
});
const Todo = mongoose_1.default.model('Todo', toDoSchema);
function toDoController(app) {
    app.get('/todo', (req, res) => {
        Todo.find({})
            .then((data) => {
            res.json(data);
        })
            .catch((err) => {
            console.error('Error retrieving data from MongoDB:', err);
            res.status(500).send('Internal Server Error');
        });
    });
    app.post('/todo', urlencodedParser, (req, res) => {
        const newTodo = new Todo({
            item: req.body.item,
        });
        console.log('Received data from the frontend:', newTodo);
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
    app.delete('/todo', (req, res) => {
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
exports.default = toDoController;
