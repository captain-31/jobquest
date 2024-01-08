import app from "./index.js"

app.listen(process.env.PORT, () => {
    console.log(`app listening on port ${process.env.PORT}`)
})