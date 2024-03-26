var mongoClient = require("mongodb").MongoClient;


module.exports = async function (context, req) {
    const method = req.method.toLowerCase();
    const client = await mongoClient.connect(process.send.AZURE_MONGO_DB)

    if (method == "get") {

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: {data: await client.db("flashcards").collection("cards").find({}).toArray(),
                    auth: req.headers['x-ms-client-principal']}
                
        };
    } else {
        // post
        const body = req.body;
        // skipping validation -- but I can at least do some basic defaulting. 
        const front = body.front ?? "front"
        const back = body.back ?? "back"
        const payload = {front, back}
        const result = await client.db("flashcards").collection("cards").insertOne(payload)
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: {id: result.insertedId, front, back}
        };

    }
    client.close();
    
}