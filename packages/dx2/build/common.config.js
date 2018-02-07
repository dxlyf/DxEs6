
module.exports={
    entry: "./index.ts", 
    output:{

        filename: "index.js", // string
        libraryTarget: "umd", // 通用模块定义
        library: "Dx", // string,
    },
    module:{
        rules:[
            {
                test:/\.tsx?$/,
                use:{
                    loader:'ts-loader',
                    options:{      
                    }
                }
            }
        ]
    },
    resolve:{
        extensions: [".ts", ".tsx", ".js"]
    }
};