const app= require("./src/app")

app.listen(3000);
 

const connectdb=require("./src/db/db")

connectdb();