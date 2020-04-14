const { exec, escape } = require('../db/mysql')
const xss = require('xss')

const getList = async (author, keyword) => {
   let sql = `select * from blogs where 1=1 `
   if (author) {
       sql += `and author='${author}' `
   }
   if (keyword) {
       sql += `and title like '%${keyword}%' `
   }
   sql += `order by createtime desc;`

   // 返回promise
   return await exec(sql)
}

const getDetail = async (id) => {
    const sql = `select * from blogs where id='${id}';`
    const rows = await exec(sql)
    return rows[0];
}

const newBlog = async (blogData = {}) => {
    // blogData 是一個博客對象，包含 title content 屬性
    // console.log('newBlog blogData...', blogData)

    // return {
    //     id: 3 // 表示新建博客，插入到數據表裡面的 id
    // }

    const title = xss(escape(blogData.title)) // escape 避免sql注入， xss 预防js乱玛攻击
    const content = xss(escape(blogData.content))
    const author = xss(escape(blogData.author))
    const createtime = xss(escape(Date.now()))

    const sql = `insert into blogs (title, content, createtime, author)
    values (${title}, ${content}, ${createtime}, ${author});`

    const insertData = await exec(sql);
    return {
        id: insertData.insertId
    }
}

const updateBlog = async (id, blogData = {}) => {
    // id 更新blog的id
    // blogData 是一個博客對象，包含title content 屬性
    // console.log('id blog', id, blogData)
    // return false

    const title = xss(escape(blogData.title))
    const content = xss(escape(blogData.content))
    const createtime = xss(escape(Date.now()))

    const sql = `update blogs set title=${title}, content=${content}, createtime=${createtime} where id = ${id};`
    
    const updateData = await exec(sql)
    if (updateData.affectedRows > 0) return true
    else return false
}

const delBlog = async (id, author) => {
    // id要刪除博客的id

    //eturn false
    id = xss(escape(id))
    author = xss(escape(author))
    const sql = `delete from blogs where id=${id} and author=${author};`
    const deleteDate = await exec(sql)
    if (deleteDate.affectedRows > 0) return true
    else return false
} 

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}