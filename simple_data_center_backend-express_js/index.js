import express from 'express'
import mongoose from 'mongoose'

import fileRoutes from './src/routes/fileRoute'
import linkRoutes from './src/routes/linkRoute'
import noteRoutes from './src/routes/noteRoute'

const app = express()
const PORT = 4000
const MongoIP = "localhost"

mongoose.Promise = global.Promise
mongoose.connect(`mongodb://${MongoIP}/datacenter`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));

fileRoutes(app);
linkRoutes(app);
noteRoutes(app);

app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname + '/public/index.html'))
)

app.listen(PORT, () =>
	console.log(`Server is running on port ${PORT}`)
)