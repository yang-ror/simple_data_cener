import express from 'express'
import mongoose from 'mongoose'

import todoRoutes from './routes/todoRoute'
import fileRoutes from './routes/fileRoute'
import linkRoutes from './routes/linkRoute'
import noteRoutes from './routes/noteRoute'

const app = express()
const PORT = 3060
const MongoIP = "localhost"

mongoose.Promise = global.Promise
mongoose.connect(`mongodb://${MongoIP}/datacenter`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));

todoRoutes(app);
fileRoutes(app);
linkRoutes(app);
noteRoutes(app);

app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname + '../public/index.html'))
)

app.listen(PORT, () =>
	console.log(`Server is running on port ${PORT}`)
)