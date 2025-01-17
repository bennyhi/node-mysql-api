import { getConnection } from '../database/database'


const PUBLIC_URL  = process.env.PUBLIC_URL

const _TABLA = "tmunay_alianzas"
const addAlianza = async (req, res) => {
   //const {body ,file} = req
   console.log(req.body)
   try {
    const alianza = req.body
    const connection = await getConnection()
    //let sql  = `INSERT INTO ${_TABLA}(nombre,enlace,imagen,estado,usuarioCreacion,fechaCreacion, usuarioModificacion,fechaModificacion) VALUES(?,?,?,?,?,?,?,?)`
    //const result = await connection.query(sql,[nom,enl,img,est,usr,fc,usr,fm])
    const result = await connection.query(`INSERT INTO ${_TABLA} SET ?`, alianza)
    console.log(result)
    res.json({ body: result })
  } catch (error) {
    res.status(500)
    res.json(error.message)
  }
}

const getAlianzas = async (req, res) => {
  try {
    const connection = await getConnection()
    const result = await connection.query(`SELECT * FROM ${_TABLA}`)
    res.json({ body: result })
  } catch (error) {
    res.status(500)
    res.json(error.message)
  }
}

const getAlianza = async (req, res) => {
  try {
    console.log(req.params)
    const { id } = req.params;
    const connection = await getConnection()
    const result = await connection.query(`SELECT * FROM ${_TABLA} WHERE id=?`, id)
    res.json({ body: result[0] })
  } catch (error) {
    res.status(500)
    res.json(error.message)
  }
}

const updateAlianza = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, enlace, imagen, usuarioModificacion } = req.body;
    if (nombre === undefined)
      res.status(400).json({ message: "Bad Request" })

    const alianza = { nombre, enlace, imagen, usuarioModificacion }
    console.log(alianza)
    const connection = await getConnection()
    const result = await connection.query(`UPDATE ${_TABLA} SET ? WHERE id=?`, [alianza, id])
    res.json({ body: result[0] })
  } catch (error) {
    res.status(500)
    res.json(error.message)
  }
}

const deleteAlianza = async (req, res) => {
  try {
    console.log(req.params)
    const { id } = req.params;
    const connection = await getConnection()
    const result = await connection.query(`DELETE FROM ${_TABLA} WHERE id=?`, id)
    res.json({ body: result })
  } catch (error) {
    res.status(500)
    res.json(error.message)
  }
}

export const methods = {
  addAlianza,
  getAlianzas,
  getAlianza,
  updateAlianza,
  deleteAlianza
}