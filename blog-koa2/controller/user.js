const { exec, escape } = require('../db/mysql')
const xss = require('xss')
const { genPassword } = require('../utils/cryp') // 密码加密

const login = async (username, password) => {
    // 先使用假數據
    // if (username === '張三' && password === '123') {
    //     return true
    // }
    // return false
    username = xss(escape(username)) // escape 避免sql注入， xss 预防js乱玛攻击

    password = genPassword(password)
    password = xss(escape(password))
    const sql = `select username,realname from users where username=${username} and password=${password};`
    const rows = await exec(sql)
    return rows[0] || {}
}

module.exports = {
    login
}