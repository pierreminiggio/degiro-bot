/**
 * @typedef {Object} Ids
 * 
 * @property {string} username
 * @property {string} pwd
 */
const ids = require('./ids.json')
const DeGiro = require('degiro-api').default
const degiro = DeGiro.create(ids)

async function start() {
    if (await loginIfNotLoggedIn()) {
        const jsessionId = degiro.getJSESSIONID()
        console.log(jsessionId)
    }  
}

/**
 * @returns {Promise<boolean>}
 */
async function loginIfNotLoggedIn() {
    return new Promise(async (resolve) => {
        if (! degiro.isLogin()) {
            await degiro.login()
            if (degiro.isLogin()) {
                resolve(true)
            }
            resolve(false)
        } else {
            resolve(true)
        }
    })
}

start()