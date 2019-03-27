let express = require('express');
let chirpStore = require('../chirpstore');
let chirpRouter = express.Router();

chirpRouter.get("/:id?", (req, res) =>{
    let id = req.params.id;
    if(id) {
        res.send(chirpStore.GetChirp(id));
    } else {
        res.send(chirpStore.GetChirps());
    }
});

chirpRouter.post("/", (req, res) => {
    chirpStore.CreateChirp(req.body);
    res.sendStatus(200);
});

chirpRouter.put("/:id", (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    chirpStore.UpdateChirp(req.params.id, {"testing":"Yes","testing1":"54546"});
    res.sendStatus(200);
});

chirpRouter.delete("/:id", (req, res) => {
    chirpStore.DeleteChirp(req.params.id);
    res.sendStatus(200);
});



module.exports = chirpRouter;