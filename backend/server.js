import express from "express";

const app = express();

app.get("/api/notes/:count",(req, res) => {
    const notesCount = req.params.count

    res.status(200).send({message:`You got ${notesCount} notes`})
})

app.post("/api/notes/:id", (req, res) => {
    res.status(201).send({message:"note posted successfully"})
})

app.put("/api/notes/:id", (req, res) => {
    res.status(200).send({message:"note updated successfully"})
})

app.delete("/api/notes/:id", (req, res) => {
    res.status(200).json({message:"note deleted successfully"})
})


app.listen(5001, () => {
    console.log('Server running on PORT: 5001');
})