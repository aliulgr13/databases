const { MongoClient } = require('mongodb');


async function main() {

    const uri = "mongodb+srv://Barbarossa13:Galatasaray13@cluster0-amdkn.mongodb.net/test?retryWrites=true&w=majority";


    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await listDatabases(client);

        //calling the newcity function to insert new data
        await createNewCity(client,
            {
                name: "akşehir",
                countryCode: "TUR",
                district: "Konya",
                population: 200000

            })

        //read the file by name
        await findOneCityByName(client, 'akşehir')
        //update the city
        await updateCityByName(client, 'akşehir', { population: 500000 })
        //read the file by countrycode
        await findOneCityByCountryCode(client, 'TUR')
        // delete the file by name
        await deleteCityByName(client, 'akşehir')


    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

// Create a new record (document) for a new city (your home town, say)
async function createNewCity(client, newCity) {
    const result = await client
        .db("new_world")
        .collection("city")
        .insertOne(newCity);
    console.log(`New City created with the following id:${result.insertedId}`);
}

// Update that record with a new population
async function updateCityByName(client, nameOfCity, updatedListing) {
    const result = await client.db("new_world").collection("city").updateOne(
        { name: nameOfCity },
        { $set: updatedListing }
    );

    console.log(`${result.matchedCount} cities matched the query criteria`);
    console.log(`${result.modifiedCount} cities were updated`);

}

// Read the document that you just updated in two ways : finding by the city name, and then by the country code
async function findOneCityByName(client, nameOfCity) {
    const result = await client
        .db("new_world")
        .collection("city")
        .findOne({ name: nameOfCity });
    if (result) {
        console.log(
            `Found a city in the collection with name '${nameOfCity}':`
        );
        console.log(result);
    } else {
        console.log(`No city found with the name '${nameOfCity}'`);
    }
}
//find one cty by countrycode
async function findOneCityByCountryCode(client, codeOfCountry) {
    const result = await client
        .db("new_world")
        .collection("city")
        .findOne({ countryCode: codeOfCountry });
    if (result) {
        console.log(
            `Found a city in the collection with the code of '${codeOfCountry}':`
        );
        console.log(result);
    } else {
        console.log(`No city found with the code of '${codeOfCountry}'`);
    }
}
// Delete the city
async function deleteCityByName(client, nameOfCity) {
    const result = await client
        .db("new_world")
        .collection("city")
        .deleteOne({ name: nameOfCity });

    console.log(`${result.deletedCount} document(s) was/were deleted`);
}
