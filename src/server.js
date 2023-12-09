import express from 'express'
import cors from 'cors'
import {client, create, readAll, readOneByName, updateByName, deleteByName} from '../infra/database.js'

export const app = express()
const port = process.env.PORT || 3001

// O express começará a ler as requisições req.body no formato de json
app.use(express.json())
app.use(cors())


app.post('/', async (req, res) => {
    try {
        await client.connect()
        await create(req.body.nome, req.body.descricao, req.body.feito)
        res.status(201).send("Cadastro feito com sucesso!")
    } finally {
        await client.close()
    }
})

app.get('/', async (req, res) => {
    try {
        await client.connect()
        res.status(200).send(await readAll())
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
})

app.get('/:nome', async (req,res) =>{
    try {
        await client.connect()
        res.status(200).send(await readOneByName(req.params.nome))
    } finally {
        await client.close()
    }
})

app.put('/:nome', async (req, res) =>{
    try {
        await client.connect()
        await updateByName(req.params.nome, req.body.nome, req.body.descricao, req.body.feito)
        res.status(200).send("Alteração feita com sucesso")
    } finally {
        await client.close()
    }
})

app.delete('/:nome', async (req, res) =>{
    try {
        await client.connect()
        await deleteByName(req.params.nome)
        res.status(200).send("Apagou atividade com sucesso!")
    } finally {
        await client.close()
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
