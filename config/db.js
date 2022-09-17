const mongoose = require('mongoose')


mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;


db.once('connected', () => {

    console.log(`Connected to mongoDB ${db.name} at ${db.host}: ${db.port}`)
})