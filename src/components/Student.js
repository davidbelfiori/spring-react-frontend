import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container ,Paper,Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),

        },
    },
}));



export default function Student() {
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const[name,setName]=useState('')
    const[address,setAddress]=useState('')
    const [email,setEmail]=useState('')
    const [dob,setDob]=useState('')
    const [ id,setId]=useState(0)

    const[students,setStudents]=useState([])
    const classes = useStyles();


    //funcion for delete all student
    const deleteall=(a)=>{
        window.location.reload();
    a.preventDefault();
    fetch("http://localhost:8080/api/student/delete",{
        method:"DELETE",
        headers:{"Content-Type":"application/json"},


    }).then(()=>{

        console.log("The student has deleted")
    })
    }


    const handleClick=(e)=>{
        e.preventDefault()
        window.location.reload();
        const student={name,address,email,dob}
        console.log(student)
        fetch("http://localhost:8080/api/student/add",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(student)

        }).then(()=>{
            console.log("New Student added")
        })
    }
    const Updated=(e)=>{
        e.preventDefault()

        const student={id,name,address,email}
        console.log(student)
        fetch("http://localhost:8080/api/student/update",{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(student)

        }).then(()=>{
            console.log("New Student added")
        })
    }

    useEffect(()=>{
        fetch("http://localhost:8080/api/student/all")
            .then(res=>res.json())
            .then((result)=>{
                    setStudents(result);
                }
            )
    },[])




    return (

        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{color:"black"}}> Add Student</h1>

                <form className={classes.root} noValidate autoComplete="off">

                    <TextField id="outlined-basic" label="Student Name" variant="outlined" fullWidth
                               value={name}
                               onChange={(e)=>setName(e.target.value)}
                    />
                    <TextField id="outlined-basic" label="Student Adress" variant="outlined" fullWidth
                               value={address}
                               onChange={(e)=>setAddress(e.target.value)}
                    />
                    <TextField id="outlined-basic" label="Student Email" variant="outlined" fullWidth
                               value={email}
                               onChange={(e)=>setEmail(e.target.value)}
                    />
                    <TextField id="outlined-basic" label="Student dob HH-MM-DY" variant="outlined" fullWidth
                               value={dob}
                               onChange={(e)=>setDob(e.target.value)}
                    />

                    <Button variant="contained" color="secondary" onClick={handleClick}>
                        Submit
                    </Button>
                    <Button variant="contained" color="secondary" onClick={deleteall}>
                        delette all
                    </Button>
                </form>

            </Paper>

            <Container>
                <Paper elevation={3} style={paperStyle}>
                    <h1 style={{color:"black"}}> Update a student</h1>

                    <form className={classes.root} noValidate autoComplete="off">

                        <TextField id="outlined-basic" label="Student id" variant="outlined" fullWidth
                                   value={id}
                                   onChange={(e)=>setId(e.target.value)}
                        />

                        <TextField id="outlined-basic" label="Student Name" variant="outlined" fullWidth
                                   value={name}
                                   onChange={(e)=>setName(e.target.value)}
                        />
                        <TextField id="outlined-basic" label="Student Adress" variant="outlined" fullWidth
                                   value={address}
                                   onChange={(e)=>setAddress(e.target.value)}
                        />
                        <TextField id="outlined-basic" label="Student Email" variant="outlined" fullWidth
                                   value={email}
                                   onChange={(e)=>setEmail(e.target.value)}
                        />


                        <Button variant="contained" color="secondary" onClick={Updated}>
                            Submit
                        </Button>
                    </form>
                </Paper>
                </Container>

            <h1>Students</h1>

            <Paper elevation={3} style={paperStyle}>

                {students.map(student=>(
                    <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={student.id}>
                        Id:{student.id}<br/>
                        Name:{student.name}<br/>
                        Address:{student.address}<br/>
                        Email:{student.email}<br/>
                        Dob:{student.dob}<br/>
                        Age:{student.age}
                    </Paper>
                ))
                }


            </Paper>



        </Container>
    );
}
