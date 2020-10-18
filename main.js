/**
 * @typedef {Object} Ids
 * 
 * @property {string} username
 * @property {string} pwd
 */
const ids = require('./ids.json')

const { PORTFOLIO_POSITIONS_TYPE_ENUM } = require('degiro-api/dist/enums')
const DeGiro = require('degiro-api').default
const degiro = DeGiro.create(ids)

async function start() {
    if (await loginIfNotLoggedIn()) {
        /*const reports = await degiro.getPortfolio(PORTFOLIO_POSITIONS_TYPE_ENUM.ALL)
        console.log(reports)*/
        const popularStonks = await degiro.getPopularStocks()
        console.log(popularStonks)
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