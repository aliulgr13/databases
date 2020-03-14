const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'meetup'
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {

    const createInviteesTable = `
    CREATE TABLE IF NOT EXISTS Invitees (
        invitee_no int(3) ZEROFILL NOT NULL,
        invitee_name varchar(30), 
        invited_by varchar(30)
        );`;
    const createRoomsTable = `
    CREATE TABLE IF NOT EXISTS Rooms (
        room_no INT,
        room_name varchar(30),
        floor_number INT
        );`;
    const createMeetingsTable = `
    CREATE TABLE IF NOT EXISTS Meetings (
        meeting_no INT, 
        meeting_title VARCHAR(50), 
        starting_time DATE, 
        ending_time DATE,
        room_no INT
        );`;


    const allDatas = {
        Invitees: [
            { invitee_no: 1, invitee_name: 'Ali', invited_by: 'Burak' },
            { invitee_no: 2, invitee_name: 'Burak', invited_by: 'Ceyda' },
            { invitee_no: 3, invitee_name: 'Cemal', invited_by: 'Derya' },
            { invitee_no: 4, invitee_name: 'Derya', invited_by: 'Emine' },
            { invitee_no: 5, invitee_name: 'Emine', invited_by: 'Feyza' }
        ],
        Rooms: [
            { room_no: 100, room_name: 'A', floor_number: 1 },
            { room_no: 201, room_name: 'B', floor_number: 2 },
            { room_no: 302, room_name: 'C', floor_number: 3 },
            { room_no: 403, room_name: 'D', floor_number: 4 },
            { room_no: 504, room_name: 'E', floor_number: 5 }
        ],
        Meetings: [
            { meeting_no: 1, meeting_title: 'just', starting_time: '2020-01-01 09:00:00', ending_time: '2020-01-01 10:00:00', room_no: 1 },
            { meeting_no: 2, meeting_title: 'horse', starting_time: '2020-01-02 09:00:00', ending_time: '2020-01-02 10:00:00', room_no: 2 },
            { meeting_no: 3, meeting_title: 'okay', starting_time: '2020-01-03 09:00:00', ending_time: '2020-01-03 10:00:00', room_no: 3 },
            { meeting_no: 4, meeting_title: 'awesome', starting_time: '2020-01-04 09:00:00', ending_time: '2020-01-04 10:00:00', room_no: 4 },
            { meeting_no: 5, meeting_title: 'cool', starting_time: '2020-01-05 09:00:00', ending_time: '2020-01-05 10:00:00', room_no: 5 }
        ]
    };

    connection.connect();



    try {

        await Promise.all[execQuery(createInviteesTable), execQuery(createRoomsTable), execQuery(createMeetingsTable)];
        Object.keys(allDatas).forEach(entity => {
            allDatas[entity].map(entityInstance => {
                execQuery(`INSERT INTO ${entity} SET ?`, entityInstance);
            });
        })

    } catch (error) {
        console.error(error);
    }

    connection.end();
}

seedDatabase();

