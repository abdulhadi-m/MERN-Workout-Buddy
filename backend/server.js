// importing express
const express = require('express')
const cors = require('cors')

// importing dotenv
const dotenv = require('dotenv')

// importing mongoose
const mongoose = require('mongoose')

// Routes
const workout = require('./routes/workout')
const userRoutes = require('./routes/user')

dotenv.config()

// express APP instance initialization
const app = express()

// middleware
app.use(express.json())
app.use(cors())

app.use((req,res, next)=>{
    console.log(req.path, req.method)
    next()
})


// routes
app.get('/', (req, res) => {
    res.json({
        msg: 'Welcome'
    })
})

app.use('/api/workouts', workout)
app.use('/api/user', userRoutes)

// port 
const PORT = process.env.PORT 

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(PORT, () => {
    console.log(`Server is up and listening at: http://localhost:${PORT}`)
    console.log(`Database is connected successfully`);
}) })
.catch((error)=>{console.log(error)});