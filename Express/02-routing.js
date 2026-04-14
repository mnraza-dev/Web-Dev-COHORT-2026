const express = require("express");
// const PORT = process.env.PORT || 8000
function basic_http_methods() {
    return new Promise((resolve) => {
        const app = express();
        app.use(express.json());

        // /files/docs/readme.txt
        // /files/assets/styles.css
        app.get('files/*filepath', (req, res) => {
            const filepath = req.params.filepath;
            res.json({
                filepath,
                type: "wildcard"
            })
        })

        app
            .route("/schedule")
            .get((req, res) => { })
            .post((req, res) => { })
            .put((req, res) => { })
            .delete((req, res) => { })

        app.use("/api", (req, res) => {
            // its a prefetch match
        })

        const routes = {
            1: { id: 1, name: "Dadar -Andheri Express", direction: "East" },
            2: { id: 2, name: "Bandra Kurla Shuttle", direction: "West" },
            3: { id: 1, name: "Rajdhani Express", direction: "North" }
        }
        let nextId = 4;
        //list all train
        app.get('/routes', (req, res) => {
            res.status(200).json(Object.values(routes));
        })
        //single route by Id

        app.get('/routes/:id', (req, res) => {
            const route = routes(req.params.id);
            if (!route) return res.status(404).json({
                error: "No train on this route"
            })
            res.json(route);
        })

        app.post("/route", (req, res) => {
            // no validation , no zod
            const newRoute = { id: nextId++, ...req.body }
            routes[newRoute.id] = newRoute
            res.status(201).json({
                newRoute
            })
        })

        app.put("/routes/:id", (req, res) => {
            const id = req.params.id;
            if (!id) return res.status(404).json({ error: "No id found" })
            if (!routes[id]) return res.status(404).json({ error: "No id found in routes" })
            routes[id] = { id: Number(id), ...req.body }
        })

        app.patch("/routes/:id", (req, res) => {
            const id = req.params.id;
            const { name, direction } = req.body;
            if (!id) return res.status(404).json({ error: "No id found" })
            if (!routes[id]) return res.status(404).json({ error: "No id found in routes" })
            routes[id] = { id: Number(id), name: name, direction: direction }
        })

        app.delete("/routes/:id", (req, res) => {
            const id = req.params.id;
            if (!routes[id]) return res.status(404).json({ error: "No id found in routes" })

            delete routes[id];
            res.status(204).end();
        })

        const server = app.listen(0, async () => {
            const port = server.address().port;
            const base = `http://127.0.0.1:${port}`;
            try {
                // List all Routes   
                const listRes = await fetch(`${base}/routes`);
                const listData = await listRes.json();
                console.log(JSON.stringify(listData));

                // Single Route 
                const singleRoute = await fetch(`${base}/routes/1`);
                const singleRouteData = await singleRoute.json();
                console.log(JSON.stringify(singleRouteData));

                //Add Route
                const createRouteRes = await fetch(`${base}/routes`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        body: JSON.stringify({
                            name: "Colaba-Worli",
                            direction: "East",
                        })
                    },

                });
                const createdRouteData = await createRouteRes.json();
                console.log(JSON.stringify(createdRouteData));

            } catch (error) {
                console.log(error)
            }

            server.close(() => {
                console.log("Basic Server closed...");
                resolve();
            })
        })
    })
}

async function main() {
    await basic_http_methods();
    process.exit(0);
}

main();