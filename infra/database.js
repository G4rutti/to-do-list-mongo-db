import { MongoClient } from "mongodb";

// Replace the uri string with your connection string.
const user = encodeURIComponent("davizin")
const password = encodeURIComponent("@rr0F3ij@o")
const uri = `mongodb+srv://${user}:${password}@cluster0.svj6inc.mongodb.net/`;
export const client = new MongoClient(uri);

const database = client.db('to_do_list');
const collection = database.collection('lista_de_afazeres');

export async function create(nome, descricao, feito){
    const doc = {
        nome: `${nome}`,
        descricao: `${descricao}`,
        feito: feito
    }

    const result = await collection.insertOne(doc)
    console.log(`O documento foi inserido com o _id: ${result.insertedId}`);

}

export async function readAll(){
    // const cursor = collection.find({_id: {$lt: 0}})
    const cursor = collection.find({})
    // Convert the cursor to an array
    const documents = await cursor.toArray();

    // Print returned documents
    return documents;
}

export async function readOneByName(nome){
    const cursor = await collection.findOne({nome:nome})
    return cursor
}

export async function updateByName(nome, alteracao1, alteracao2, alteracao3){
    const filter = {nome: nome}
    const updateName = {
        $set : {
            nome: alteracao1,
            descricao: alteracao2,
            feito: alteracao3
        }
    }
    const result = await collection.updateOne(filter, updateName)
    return result
}

export async function deleteByName(nome){
    const query = {nome : nome}
    const result = await collection.deleteOne(query)
    return result
}

async function run() {
  try {
    await client.connect()
    // Fazer todas as etapas do crud
    // await create("Arrumar cabelo","Passar shampoo do cr7 de depois finaliza-lo")
    // await readAll()
    // await readOneByName('Estudar')
    // await updateByName("Estudar", "Estudar", "Estudar as linguagens de programação Python e Django")
    // await deleteByName("Organizar casa")

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);