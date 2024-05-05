const router = require('express').Router()
const conexion = require('./config/conexion')

// GET pacientes
router.get('/pacientes', (req, res)=>{
    conexion.query('SELECT * FROM tb_pacientes', (err, rows, fields)=>{
        if(err){
            console.log(err);
            return;
        }else{
            res.json(rows);
        }
    });
})

// GET un paciente
router.get('/pacientes/:ci', (req, res)=>{
    const {ci} = req.params;
    conexion.query('SELECT * FROM tb_pacientes WHERE ci = ?', [ci], (err, rows, fields)=>{
        if(err){
            console.log(err);
            return;
        }else{
            res.json(rows[0]);
        }
    });
})

// POST un paciente
router.post('/pacientes', (req, res) => {
    const { ci, nombre, tipoSangre } = req.body;
    let sql = 'INSERT INTO tb_pacientes (ci, nombre, tipoSangre) VALUES (?, ?, ?)';
    conexion.query(sql, [ci, nombre, tipoSangre], (err, rows, fields) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Error al agregar el paciente' });
      } else {
        res.json({ status: 'Paciente agregado' });
      }
    });
});

// DELETE un paciente
router.delete('/pacientes/:ci', (req, res)=>{
    const {ci} = req.params;
    if (typeof ci === 'undefined') {
        res.status(400).json({ error: 'CI no definido' });
    } else {
        conexion.query('DELETE FROM tb_pacientes WHERE ci = ?', [ci], (err, rows, fields)=>{
            if(err){
                console.log(err);
                return;
            }else{
                res.json({status: 'Paciente eliminado'});
            }
        });
    }
})

// PUT un paciente
router.put('/pacientes/:ci', (req, res) => {
    const { nombre, tipoSangre } = req.body;
    const { ci } = req.params;
    let sql = `UPDATE tb_pacientes SET nombre = ?, tipoSangre = ? WHERE ci = ?`;
    conexion.query(sql, [nombre, tipoSangre, ci], (err, rows, fields) => {
      if (err) {
        console.log(err);
        return;
      } else {
        res.json({ status: 'Paciente actualizado' });
      }
    });
});

module.exports = router;
