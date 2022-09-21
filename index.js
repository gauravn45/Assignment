const app =require('./app');
const http=require('http');
const sequelize = require('./dbcon/conn.js');

const PORT=5000;

const server = http.createServer(app);

//database connection 
const connectingDb = async () => {
    try {
      const connect = await sequelize.sync();

    } catch (err) {
      console.log("database connection error=", err.message);
     
    }
  };

  connectingDb();



server.listen(PORT, ()=>{
    console.log("Application running on port ",PORT);
})