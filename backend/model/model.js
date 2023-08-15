"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCollection = exports.userCollection = void 0;
const mongoConnect_1 = require("./mongoConnect");
//Users Collection 
exports.userCollection = mongoConnect_1.client.db('chatapp').collection('users');
//create collection function
function createCollection(obj) {
    return mongoConnect_1.client.db('chatapp').createCollection(obj.name, {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: [...obj.required],
                properties: obj.schema
            }
        }
    });
}
exports.createCollection = createCollection;
