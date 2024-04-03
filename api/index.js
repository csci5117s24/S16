const { app } = require('@azure/functions');
const { ObjectId } = require('mongodb');
const mongoClient = require("mongodb").MongoClient;


app.http('getDecks', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'deck',
    handler: async (request, context) => {
        const auth_header = request.headers.get('X-MS-CLIENT-PRINCIPAL')
        let token = null
        if (auth_header) {
            token = Buffer.from(auth_header, "base64");
            token = JSON.parse(token.toString());
            console.log(token)
        }
        const client = await mongoClient.connect(process.env.AZURE_MONGO_DB)
        const decks = await client.db("flashcards").collection("decks").find({}).toArray()
        client.close();
        return {
            jsonBody: {data: decks}
        }
    },
});

app.http('getDeck', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'deck/{id}',
    handler: async (request, context) => {
        const id = request.params.id;
        if (ObjectId.isValid(id)) {
            const client = await mongoClient.connect(process.env.AZURE_MONGO_DB)
            const deck = await client.db("flashcards").collection("decks").findOne({_id: new ObjectId(id)})
            client.close();

            if (deck) {
                return {
                    jsonBody: {deck: deck}
                }
            }
        }
        return {
            status:404,
            jsonBody: {error: "no deck found by that Id"}
        }
    },
});

app.http('updateDeck', {
    methods: ['PUT'],
    authLevel: 'anonymous',
    route: 'deck/{id}',
    handler: async (request, context) => {
        const id = request.params.id;

        const body = await request.json();
        // skipping validation -- but I can at least do some basic defaulting, and only grab the things I want.
        const name = body.name ?? "no name"
        const cards = body.cards ?? []
        
        if (ObjectId.isValid(id)) {
            const client = await mongoClient.connect(process.env.AZURE_MONGO_DB)
            // this could not possibly be the fast way to do things.
            const result = await client.db("flashcards").collection("decks").updateOne({_id: new ObjectId(id)}, {$set: {name, cards}})
            client.close();
            if (result.matchedCount > 0) {
                return {
                    jsonBody: {status: "ok"}
                }
            }            
        }
        return {
            status:404,
            jsonBody: {error: "no deck found by that Id"}
        }
    },
});
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// use as follows: `await sleep(1000);`
app.get("test", {
    route: "test",    
    authLevel: 'anonymous',
    handler: async function() {
        await sleep(10000);
        return {
            jsonBody: {status: Math.random()>0.5}
        }
    }
})

app.http('newDeck', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'deck',
    handler: async (request, context) => {
        const client = await mongoClient.connect(process.env.AZURE_MONGO_DB)

        const body = await request.json();
        // skipping validation -- but I can at least do some basic defaulting, and only grab the things I want.
        const name = body.name ?? "name"
        const cards = body.cards ?? []
        const payload = { name, cards }
        const result = await client.db("flashcards").collection("decks").insertOne(payload)

        client.close();
        return{
            status: 201, /* Defaults to 200 */
            jsonBody: {_id: result.insertedId, name, cards:cards}
        };
    },
});