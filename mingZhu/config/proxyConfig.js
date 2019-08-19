//使用代理解决跨域问题
module.exports = {
    proxyTable: {
        '/travel':{
            target: 'http://localhost:9000/', //  
            changeOrigin: true,      
            pathRewrite: { 
                '^/api': '' 
            }
        }
    }
} 
