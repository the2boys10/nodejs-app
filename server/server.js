require('./config/config');

const bodyParser = require('body-parser');
const express = require('express');
var app = express();
app.use(bodyParser.json());
var swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');
var router = express.Router();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);


var {mongoose} = require('./db/mongoose');
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const routes = require("./routes/user").concat(require("./routes/todo"));

app.use("/",routes);



app.listen(process.env.PORT,()=>{
    console.log(`Started server on port ${process.env.PORT}`);
});

module.exports = {app};