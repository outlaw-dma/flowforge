/**
 * Routes that serve the forge frontend web app
 *
 * - `/`
 * - `/index.html`
 * - `/app/*`
 *
 * The src code for the ui is under the `frontend` directory. It is built using
 * webpack into the `frontend/dist` directory.
 *
 * This code checks that exists and logs an error if its missing.
 *
 * @namespace ui
 * @memberof forge.routes
 */
const path = require('path')
const fs = require('fs')
const Avatar = require("./avatar");

module.exports = async function(app) {

    const frontendAssetsDir = path.join(__dirname, "../../../frontend/dist/")

    // Check the frontend has been built
    if (!fs.existsSync(path.join(frontendAssetsDir,"index.html"))) {
        throw new Error("'/frontend/dist/index.html' not found. Have you run `npm run build`?")
    }

    app.register(Avatar, { prefix: "/avatar" })

    app.get('/', (request, reply) => {
        if (!app.settings.get("setup:initialised")) {
            reply.redirect("/setup")
            return
        }
        reply.sendFile('index.html')
    })

    // Setup static file serving for the UI assets.
    app.register(require('fastify-static'), {
        index: false,
        wildcard: false, // This option is needed so we can redirect 404s back to index.html
        root: frontendAssetsDir
    })

    // Any requests not handled by this time get served `index.html`.
    // This allows the frontend vue router to change the browser URL and we cope
    // if the user then hits reload
    app.get('*', (request, reply) => {
        reply.sendFile('index.html')
    })
}
