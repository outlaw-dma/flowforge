/**
 * Routes related to the forge api
 *
 * The forge api is served from `/api/v1/`.
 * @namespace api
 * @memberof forge.routes
 */
const User = require("./user.js");
const Users = require("./users.js");
const Team = require("./team.js");
const Teams = require("./teams.js");
const Project = require("./project.js");
const Admin = require("./admin.js");
const Settings = require("./settings.js");

module.exports = async function(app) {
    app.addHook('preHandler',app.verifyTokenOrSession);
    app.decorate('getPaginationOptions', (request, defaults) => {
        const result = {...defaults};
        if (request.query.limit !== undefined) {
            result.limit = request.query.limit;
        }
        if (request.query.cursor !== undefined) {
            result.cursor = request.query.cursor;
        }
        return result;
    })

    app.register(Settings, { prefix: "/settings" })
    app.register(Admin, { prefix: "/admin" })
    app.register(User, { prefix: "/user" })
    app.register(Users, { prefix: "/users" })
    app.register(Team, { prefix: "/teams" })
    app.register(Project, { prefix: "/projects"})
    app.get('*', function (request, reply) {
        reply.code(404).type('text/html').send('Not Found')
    })
}
