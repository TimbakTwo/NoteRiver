export function getNotes(req, res) {
    const notesCount = req.params.count
    res.status(200).send({message:`You got 10 notes`})
}

export function postNote(req, res) {
    res.status(201).send({message:"note posted successfully"})
}

export function updateNote(req, res) {
    res.status(200).send({message:"note updated successfully"})
}

export function deleteNote(req, res) {
    res.status(200).json({message:"note deleted successfully"})
}
