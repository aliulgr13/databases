const mysql = require('mysql');
//const util = require('util');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'new_world',
});

connection.connect();


const queries = {
    countGreater8M: 'SELECT name, population FROM country WHERE population > 8000000;',
    countriesIncludesLand: "SELECT name FROM country WHERE name LIKE '%land%';",
    cityBetween500kAnd1M: 'SELECT name, population FROM city WHERE population BETWEEN 500000 AND 1000000;',
    countriesInEurope: "SELECT name FROM country WHERE continent = 'Europe';",
    countriesBySurfaceArea: 'SELECT name, SurfaceArea FROM country ORDER BY SurfaceArea DESC;',
    citiesInNL: "SELECT name, countryCode from city where countryCode LIKE 'NLD';",
    populationRotterdam: "SELECT name, population FROM city WHERE name = 'Rotterdam';",
    top10CountriesBySurfaceArea: 'SELECT name, SurfaceArea FROM country ORDER BY SurfaceArea DESC LIMIT 10;',
    top10CitiesByPopulation: 'SELECT name, population FROM city ORDER BY population DESC LIMIT 10;',
    populationSumOfWorld: "SELECT SUM(population)  AS 'Population of the World' FROM country;",
};


for (let i in queries)
    connection.query(queries[i], function (error, results, fields) {
        if (error) {
            throw error;
        }
        console.log(` ${i}`, results);
    });

connection.end();