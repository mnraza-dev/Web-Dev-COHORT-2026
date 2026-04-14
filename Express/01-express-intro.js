const express = require("express");
const PORT = process.env.PORT || 8000

function basic_server() {
    return new Promise((resolve) => {
        const app = express();
        app.use(express.json());

        app.get("/menu", (req, res) => {
            res.json({
                items: ["Biryani", "Thali", "Roti"]
            })
        })
        app.get("/menu/:id", (req, res) => {
            res.json({
                id: id,
                items: "Biryani",
            })
        })
        app.get("/search", (req, res) => {
            const { q, limit } = req.query;
            res.json({
                query: q,
                limit: limit || 10
            })
        })

        app.post("/order", (req, res) => {
            const order = req.body;
            res.status(201).json({
                status: "created",
                order
            })
        })

        const server = app.listen(0, async () => {
            const port = server.address().port;
            const base = `http://127.0.0.1:${port}`;
            try {
                const menuRes = await fetch(`${base}/menu`);
                const menuData = await menuRes.json();
                console.log('GET /menu', JSON.stringify(menuData));
                console.log('**********************************');

                const searchRes = await fetch(`${base}/search?q=biryani&limit=2`);
                const searchData = await searchRes.json();
                console.log('GET /search ', JSON.stringify(searchData));

                const menuItemRes = await fetch(`${base}/menu/43`);
                const menuItemData = await menuItemRes.json();
                console.log(`GET /menu/:id`, JSON.stringify(menuItemData));

                const orderRes = await fetch(`${base}/order`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'body': JSON.stringify({
                            dish: 'biryani',
                            quantity: 2
                        })
                    }
                });
                const orderData = await orderRes.json();
                console.log(`POST /order`, JSON.stringify(orderData));


            } catch (error) {
                console.log(error)
            }

            server.close(() => {
                console.log("Basic Server 1 served......");
                resolve();
            })
        })
    })
}

function basic_response() {
    return new Promise((resolve) => {
        const app = express();

        app.get("/text", (req, res) => {
            res.send("Hello from chaicode..");
        })

        app.get("/not-found", (req, res) => {
            res.status(401).json({
                error: 'Page not found'
            })
        })

        app.get("/health", (req, res) => {
            res.sendStatus(200);
        })

        app.get("/old-menu", (req, res) => {
            // add entry in DB to see how many users are still visiting the old route.
            res.redirect(301, '/new-menu');
        })

        app.get("/xml", (req, res) => {
            res.type('application/xml').send('<dish><name>Biryani</name></dish>');


        })

        app.get("/custom-header", (req, res) => {
            res.set('X-powered-By', 'chaicode');
            res.set('X-Request-Id', '12345');
            res.json({
                message: "Custom headers set"
            });

            // CORS , Rate Limiting, tracing, caching
        })

        app.get('/no-content', (req, res) => {
            res.status(204).end();
        })

        const server = app.listen(0, async () => {
            const port = server.address().port;
            const base = `http:127.0.0.1:${port}`;

            try {
                //TODO:
            } catch (error) {
                console.log(error)
            }
        })
    })
}

async function main() {
    await basic_server();
    await basic_response();
    process.exit(0);
}

main();