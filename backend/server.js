const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors')

const app=express()
app.use(express.json())
app.use(cors())
//route
/* app.get('/',(req,res)=>{
    res.send("hello world")
})
    let todos=[];
 */

mongoose.connect('mongodb://localhost:27017/mern-app')
.then(()=>{
    console.log('DB connected');
    })
    .catch((err)=>{
console.log(err)

    })

 //schema
 const todoSchema=new mongoose.Schema({
       title:{
        required: true,
        type: String
       },
       description: String
 })   
const todoModel=mongoose.model('Todo',todoSchema);

app.post('/todos',async(req,res)=>{
    const {title,description}=req.body
   /*  const newTodo={
        id: todos.length +1,
        title,
        description
    };
    todos.push(newTodo);
    console.log(todos) */
    try{
        const newTodo=new todoModel({title,description})
        await newTodo.save();
        res.status(201).json(newTodo);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: error.message});
    }
    
})  
   
//
app.get('/todos',async(req,res)=>{
    try{
    const todos=await todoModel.find();
    res.json(todos);
    }catch(error){
        console.log(error);
        res.status(500).json({message: error.message});
    }
   
})

app.put("/todos/:id",async(req,res)=>{
    try{
    const {title,description}=req.body;
    const id=req.params.id;
   const updateTodoDoc= await todoModel.findByIdAndUpdate(
        id,
        {title,description},
        {new:true}
    )
    if(!updateTodoDoc){
        return res.status(404).json({message:"Todo not found"})
    }
      res.json(updateTodoDoc)
  
}
catch(error){
      console.log(error);
        res.status(500).json({message: error.message});
}
})

app.delete("/todos/:id",async(req,res)=>{
    try{
    const id=req.params.id;
    const deletedoc=await todoModel.findByIdAndDelete(id);
    res.status(204).end();
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: error.message}); 
    }
})
// start the  server
const port=8000;
app.listen(port,()=>{
    console.log("server listening to the port"+port);
    
})