var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true });
mongoose.connect('mongodb+srv://the2boys10:mywebsitepassword@cluster0-qjn8e.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });
module.exports = {mongoose};