class BaseModel {
    /**
     * 
     * @param {*} data 
     * @param {*} message
     * 
     * 传入一个类型对象data和一个字符串message 
     * 也可只传入一个字符串，此时只通过第一个判断
     *  
     */
    constructor(data, message) {
        if (typeof data === 'string') {
            this.message = data
            data = null
            message = null
        }
        if (data) {
            this.data = data
        }
        if (message) {
            this.message = message
        }
    }
}

class SuccessModel extends BaseModel {
    constructor(data, message) {
        super(data, message) // 执行basemodel的代码
        this.errno = 0
    }
}

class ErrorModel extends BaseModel {
    constructor(data, message) {
        super(data, message) 
        this.errno = -1
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}