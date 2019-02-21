var env = process.env.NODE_ENV || 'development';

if(env === 'development'){
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/TodoApp';
} else if (env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/TodoAppTest';
} else {
    process.env.MONGODB_URI = 'mongodb+srv://the2boys10:mywebsitepassword@cluster0-qjn8e.mongodb.net/test?retryWrites=true';
}

