// The address of this server connected to the network is:
// URL -> http://localhost:8383
// IP -> 127.0.0.1:8383
const express = require('express');
const app = express();
const PORT = 8383;
let data = [{
        name: 'james',
        details: { age: 24, job: "developer" }
    }, {
        name: 'sara',
        details: { age: 22, job: "designer" }
    }, {
        name: 'emma',
        details: { age: 26, job: "manager" }
    }
];

// Middleware
app.use(express.json()); // to parse JSON bodies

// Type 1 - Website endpoints
app.get('/', (req, res) => {
    console.log("Homepage Requested");
    // Endpoint num 1 at /
    res.send(`
    <body style="text-align: center; background-color: lightgrey; color: darkblue;">
        <h1>Home Page <br> DATA:</h1>
        <p>${JSON.stringify(data)}</p>
        <A href="/dashboard">Go to Dashboard</A>
    </body>
    `);
});

app.get('/dashboard', (req, res) => {
    // console.log("<h1>Hit dashboard endpoint</h1>");
    res.send(`
        <body>
        <h1>Welcome</h1><p>This is the dashboard</h1>
        <a href="/">Go to Home</a>
        </body>`);
});

// CRUD-methods

// Type 2 - API endpoints
app.get('/api/data', (req, res) => {
    // res.json({ name: "Ismail", age: 24 });
    console.log("Hit API endpoint");
    res.send(data);
});

app.post('/api/data', (req, res) => {
    // console.log("Hit API endpoint with POST method");
    // CREATE USER
    const newData = req.body;
    console.log(newData);
    data.push(newData.name, newData.age, newData.job);
    // res.send(newData);
    res.sendStatus(201); // Created
});

app.delete('/api/data', (req, res) => {
    data.pop();
    res.sendStatus(203); // OK
});

// Listen on PORT
app.listen(PORT, () => console.log(`server has started on: ${PORT}`));