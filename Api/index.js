require('./config/conexion');
const express = require('express')
const port = (process.env.port || 3000)
const cors = require('cors');

// express
const app = express()

//admitir
app.use(express.json())

// usar cors
app.use(cors());

//configurar
app.set('port',port)

//rutas
app.use('/api', require('./rutas'))


//inicializar express
app.listen(app.get('port'),(error)=>{
    if(error)
    {console.log('error al iniciar el servidor: '+error)}
    else{
        console.log('servidor iniciado en el puerto: '+port)
    }
})
