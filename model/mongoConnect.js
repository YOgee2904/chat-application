const {MongoClient} = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');

async function connect(){
    try {
        await client.connect()
        console.log('Connect successfully')
        const db = client.db('chatapp')
        const collection = db.collection('sessions')
        return collection
        
    } catch (error) {
        console.log(error.message)
    }
    
}

async function disconnect(){
    await client.close()
}

module.exports = {
    client,
    connect,
    disconnect
}

