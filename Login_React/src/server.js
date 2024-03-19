import app from './index.js'
import { connectDB } from "./db.js";

const port = 5000;

connectDB();
app.listen(port, ()=>{
    console.log(`Server on port ${port}`)
})
