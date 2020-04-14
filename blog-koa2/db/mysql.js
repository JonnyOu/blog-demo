const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db')

// 创建连接对象
const con = mysql.createConnection(MYSQL_CONF)

// 连接对象
con.connect()

// 执行sql的函数
function exec(sql) {
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            resolve(result) // result是数据库的执行结果，包括affectedRows和insertId等信息
        })
    })
    return promise
}

module.exports = {
    exec,
    escape: mysql.escape
}