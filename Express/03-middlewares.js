const express = require("express");

function basic_middlewares() {
    return new Promise((resolve) => {
        const app = express();
        app.use(express.json());

        app
            .route("/schedule")
            .get((req, res) => { })
            .post((req, res) => { })
            .put((req, res) => { })
            .delete((req, res) => { })

        const logs = [

        ]
        // Request Logger
        app.use((req, res, next) => {
            // add to database
            // console.log() everything
            // write in some file
            // authenticate user
            // if(env === "PROD")
            const logEntry = `${req.method} : ${req.url}`;
            logs.push(logEntry);
            console.log(`LOG -- ${logEntry}`)
            // if your request hang forever 
            next()
        })

        app.use((req, res, next) => {
            req.startTime = Date.now();
            res.on('finish', () => {
                const duration = Date.now() - req.startTime;
                console.log(`TIMER -- ${req.method} - ${req.url} took ${duration}ms`)
            })
            next()
        })

        // app.use((req,res, next)=>{

        // })

        function authMe(req, res, next) {
            const token = req.headers['X-auth-token']
            if (!token) return res.status(401).josn({ error: "No Token, Plz Login " });
            if (token !== "secret-chaicode") {
                return res.status(403).json({
                    "error": "Invalid token"
                })
            }
            // token  => extract data from token => userId, username, email
            req.user = {
                id: 1,
                name: "MN Raza",
                role: "admin"
            }
            next()
        }
        function getRole(role) {
            return (req, res, next) => {
                if (!req.user || req.user.role !== role) {
                    return res.status(403).json({
                        error: `Role ${role} required`
                    })
                }
                next()
            }

        }

        app.get("/profile", authMe, getRole('admin'), (req, res) => {
            res.status(200).json({
                success: true,
            })
        })
        const server = app.listen(0, async () => {
            const port = server.address().port;
            const base = `http://127.0.0.1:${port}`;
            try {

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
    await basic_middlewares();
    process.exit(0);
}

main();