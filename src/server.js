import express from 'express'
import {client, create, readAll, readOneByName, updateByName, deleteByName} from '../infra/database.js'
const app = express()
const port = process.env.PORT || 3000

// O express começará a ler as requisições req.body no formato de json
app.use(express.json())


app.post('/', async (req, res) => {
    try {
        await client.connect()
        await create(req.body.nome, req.body.descricao, req.body.feito)
        res.status(201).send("Cadastro feito com sucesso!")
    } catch (error){
        console.dir
    }
})

app.get('/', async (req, res) => {
    try {
        await client.connect()
        res.status(200).send(await readAll())
    } catch (error) {
        console.dir
    }
})

app.get('/:nome', async (req,res) =>{
    try {
        await client.connect()
        res.status(200).send(await readOneByName(req.params.nome))
    } catch (error) {
        console.dir
    }
})

app.put('/:nome', async (req, res) =>{
    try {
        await client.connect()
        await updateByName(req.params.nome, req.body.nome, req.body.descricao, req.body.feito)
        res.status(200).send("Alteração feita com sucesso")
        } catch (error) {
        console.dir
    }
})

app.delete('/:nome', async (req, res) =>{
    try {
        await client.connect()
        await deleteByName(req.params.nome)
        res.status(200).send("Apagou atividade com sucesso!")
    } catch (error) {
        console.dir
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
