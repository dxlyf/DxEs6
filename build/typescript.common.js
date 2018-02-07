

module.exports={
    context:root,
    entry: "./index.ts", 
    output:{
        path: path.resolve(root, "dist"), // string
        filename: "index.js", // string
        libraryTarget: "umd", // 通用模块定义
        library: "Dx", // string,
    },
    module:{
        rules:[

        ]
    },
    resolve:{
        extensions: [".ts", ".tsx", ".js"]
    }

};