import app from "./index.js"

const port = process.env.PORT || 3030

app.listen(process.env.PORT, () => {
    console.log(`app listening on port ${process.env.PORT}`)
})