const isLt10M = 10
const isLt500M = 800
const addFile100M = 100    //补充文件 
export default {
    install (Vue) {
        Vue.prototype.$isLt10M = isLt10M
        Vue.prototype.$isLt500M = isLt500M
        Vue.prototype.$addFile100M = addFile100M
    }
}