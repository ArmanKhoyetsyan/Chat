const express = require('express')
const cors = require('cors')

const app = express();
const port = process.env.PORT || 3030;
app.use(cors())


app.get('/',(req,res)=>{
    res.send('hi')
})

app.listen(port, () => console.log(`Port${port}`))


