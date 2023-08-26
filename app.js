const express = require('express');
var port=3005;
const app = express();
const path=require('path');
var cors=require('cors');
app.use(cors());
const cookieParser=require('cookie-parser');
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.get('/', function(req,res){
  res.sendFile('index.html', { root: path.join(__dirname, 'views') });
});
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
  const userRouter =require('./Routers/userRouter');
  app.use("/user", userRouter);