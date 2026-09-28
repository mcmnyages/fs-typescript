import express from "express"
import cors from "cors"
import diagnosesRoutes from './routes/diagnosesRoutes.ts'
import patientsRoutes from './routes/patientsRoutes.ts'

const app = express();
app.use(cors())


app.use(express.json());
app.get('/api/ping',(_req,res)=>{
    res.send('pong')
});


app.use('/api/diagnoses', diagnosesRoutes);
app.use(' /api/patients',patientsRoutes);

const PORT=3001;
app.listen(PORT, ()=>{
    console.log(`Server up and running on port:${PORT}`);
});