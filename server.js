const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const app = express();

// connect to db
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('DB connected'))
    .catch((err) => console.log('DB CONNECTION ERROR: ', err));

// app middlewares
// app.use(bodyParser.json());

app.use(fileUpload());
app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors()); // allows all origins
// swagger
// routes attached with server
app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/publicPost'));
app.use('/api', require('./routes/weatherReport'));
app.use('/api', require('./routes/chatApplicationData'));
app.use('/api', require('./routes/messageSend'));

// app.use("/api", require("./routes/auth"));

const port = process.env.PORT || 5001;

/* app.listen(port, () => {
    console.log(`API is running on port ${port}`);
}); */
const server = app.listen(port, console.log(`Server running on PORT ${port}...`));
const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: `${process.env.CLIENT_URL}`,
        // credentials: true,
    },
});

io.on('connection', (socket) => {
    console.log('Connected to socket.io');
    socket.on('setup', (userData) => {
        socket.join(userData.id);
        console.log(userData.id);
        socket.emit('connected');
    });
    socket.on('join chat', (room) => {
        socket.join(room);
        console.log(`User Joined Room: ${room}`);
    });
    socket.on('typing', (room) => socket.in(room).emit('typing'));
    socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

    socket.on('new message', (newMessageRecieved) => {
        const { chatApplicationInfo } = newMessageRecieved;
        console.log('chat', chatApplicationInfo);
        if (!chatApplicationInfo.users) return console.log('chat.users not defined');

        chatApplicationInfo.users.forEach((user) => {
            console.log(user);
            if (user._id === newMessageRecieved.sender._id) return;

            socket.in(user._id).emit('message recieved', newMessageRecieved);
        });
    });
    /* socket.off('setup', (userData) => {
        console.log('USER DISCONNECTED');
        socket.leave(userData._id);
    }); */
});

const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/', (req, res) => {
    res.send('Hello World!');
});
