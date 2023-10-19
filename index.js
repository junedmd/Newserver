import express from 'express';

const app=express();

app.use(express.json());
const PORT=5000;

const students=[]

app.get('/students', (req,res)=>{

    res.json({
        success:true,
        data:students,
        messege:"successfully get all students",
    })
})

app.post('/student',(req,res)=>{
        const {name,email,age ,mobile}=req.body;

        if(!name){
            return res.json({
                success:false,
                messege:'name is not found'
            })
        }

        if(!email){
            return res.json({
                success:false,
                messege:'email is not found'
            })
        }

        if(!age){
            return res.json({
                success:false,
                messege:'age is not found'
            })
        }
        if(!mobile){
            return res.json({
                success:false,
                messege:'mobile is not found'
            })
        }
        const newStudents ={
            'name':name ,
            'age':age,
            'email':email,
            'mobile':mobile
        }

        students.push(newStudents);

        res.json({
            name:true,
            data:newStudents,
            messege:"successfully added new data"

        })

})


app.get('/student',(req,res)=>{
        const {name}=req.query;
        let newName ;

        students.forEach((item)=>{
                if(item.name == name){
                    newName=item;
                }
        });

        console.log(newName)
        res.send({
            name:true,
            data:newName,
            message:"successfully data found"
        })
})

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})