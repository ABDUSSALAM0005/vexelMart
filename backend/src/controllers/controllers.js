
export function getProducts(req, res) {
    res.status(200).send("You just fetched the notes");
}
export function createProducts(req, res) {
    res.status(201).json({ message:"You just fetched the notes" });
}
export function updateProducts(req, res) {
    res.status(200).send({ message:"Note updated successfuully" });
}
export function deleteProducts(req, res) {
    res.status(200).send("Note deleted successfully");
}
