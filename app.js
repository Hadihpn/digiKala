const express = require("express")
require("dotenv").config();
const port = process.env.PORT
const sequelize = require("./src/config/sequelize.config")
async function call_models() {
    require("./src/modules/product/product.model")
}
async function main() {
    const app = express();
await call_models()
await sequelize.sync({alter:true})
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use((req,res,next)=>{
    return res.status(404).json({
        messsage:"not found route"
    })
})
app.use((err,req,res,next)=>{
    const status = err?.status??500;
    const message = err?.message ?? "internal server error"
    return res.status(status).json({
        messsage
    })
})
app.listen(3000,()=>{
    console.log(`connected to server On :http://127.0.0.1:${port}`);})
}
main()