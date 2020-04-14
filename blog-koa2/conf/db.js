// process.env.NODE_ENV 返回 undefined，为什么？？
// 此问题有些严重，因为似乎很常用，但我已经搞一晚上了
// 网上说要在系统上配置NODE_ENV变量，试过了，不行
// 原因可能是用了cross-env，这个工具是跨平台自动生成变量，有了这个就不用再在系统上配置（可能）
// 要是工作中遇到太多类似的问题我想我会崩溃

// 最新发现：当用命令npm run dev的时候process.env.NODE_ENV有值，而用nodemon启动项目时没有
// 启动方式不对，后一种启动方式可能不会启用cross-env插件
// 对npm不甚了解，等这次项目完了再去完整学一遍吧！
const env = process.env.NODE_ENV || 'dev' // 环境参数 || 'dev'
// console.log(env)
// 配置
let MYSQL_CONF
let REDIS_CONF

if (env === 'dev') {

    // MYSQL_CONF
    MYSQL_CONF = {
        host: '127.0.0.1',
        user: 'JonnyOu',
        password: '123456',
        port: '3306',
        database: 'myblog'
    }

    // REDIS_CONF
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

if (env === 'production') {
    MYSQL_CONF = {
        host: '127.0.0.1',
        user: 'JonnyOu',
        password: '123456',
        port: '3306',
        database: 'myblog'
    }

    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }

}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}