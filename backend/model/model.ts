import {client} from './mongoConnect';

interface collectionOptions{
    name: string; 
    required: string[];
    schema: object;

}

//Users Collection 
export const userCollection = client.db('chatapp').collection('users');


//create collection function
export function createCollection(obj: collectionOptions){
    return client.db('chatapp').createCollection(obj.name, {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: [...obj.required], 
                properties: obj.schema
            }
        }
    });
}