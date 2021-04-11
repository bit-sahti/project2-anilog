const mongoose = require('mongoose');

mongoose
    .connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log(`Connected to ${db.connections[0].name} database`))
    .catch(err => console.log(err))