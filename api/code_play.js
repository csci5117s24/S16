// this file is not meant to be run like a "function" -- it's just in this repo so I can use mongodb without installing it elsewhere.

const { ObjectId } = require('mongodb');
const mongoClient = require("mongodb").MongoClient;


// fill this in if you wanna run the thing!
mongodb_connection_string = ""

// it's a lot easier to do this in an async function, so let's just bootstrap that.
async function test(){
    const client = await mongoClient.connect(mongodb_connection_string)

    // for form 1 -- just get THE object and navigate it.
    // for form 2 -- just get the decks directly.

    console.log((await client.db("form3").collection("decks").aggregate(
        [{$lookup:{
            from:"cards",
            localField: "cards",
            foreignField: "_id",
            as: "cards"
        }}]).toArray())[0])


    console.log((await client.db("form4").collection("decks").aggregate(
        [{$lookup:{
            from:"cards",
            localField: "_id",
            foreignField: "deck",
            as: "cards"
        }}]).toArray())[0])

        //https://learn.microsoft.com/en-us/azure/cosmos-db/mongodb/feature-support-42
        // we can't do full-text-search, but we can do regex, so taht's a thing.
    console.log(await client.db("form3").collection("cards").find({front: {$regex:"code"}}).toArray())

    client.close()
    return "done"
}
test().then(console.log)
