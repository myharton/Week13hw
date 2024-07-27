const express = require("express");
const { LocalStorage } = require("node-localstorage")
const app = express();
const PORT = 3000;
app.use(express.json());


let array = [];

const localStorage = new LocalStorage('./scratch')

// localhost:3000/item/tasks
app.get("/item/:key", (req, res) => {
    let key = req.params.key;
    let storedItem = JSON.parse(localStorage.getItem(key))
    res.send(storedItem);
})

app.post("/item", (request, response) => {
    const { key, value } = request.body;

    // see if there is already a saved item stored at key
    let storedItem = JSON.parse(localStorage.getItem(key))

    if (storedItem) {
        //if storedItem exists
        // its already an array
        storedItem.push(value);
        localStorage.setItem(key, JSON.stringify(storedItem))
    } else {
        // storedItem doesn't exists
        // create the array
        localStorage.setItem(key, JSON.stringify([value]))
    }



    // add value to existing saved item
    response.send(request.body);

})


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
    localStorage.setItem("tasks", JSON.stringify(array));
    let storage = JSON.parse(localStorage.getItem("key"));
})



  