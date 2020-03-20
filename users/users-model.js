const bcrypt =require("bcryptjs")
const db = require("../data/config")


async function addUser(user) {
    user.password = await bcrypt.hash(user.password, 14)
    const [id] = await db("users").insert(user)
    return findById(id)
}

function findUsers() {
    return db("users").select("id", "username")
}

function findById(id) {
    return db("users")
        .select("id", "username")
        .where({id})
        .first()
}

module.exports = {
    addUser,
    findUsers,
    findById
}
