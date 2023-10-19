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

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})