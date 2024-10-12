const axios=require('axios')

const languageConfig = {
    python3: { versionIndex: "3" },
    java: { versionIndex: "3" },
    cpp: { versionIndex: "4" },
    nodejs: { versionIndex: "3" },
    c: { versionIndex: "4" },
    ruby: { versionIndex: "3" },
    go: { versionIndex: "3" },
    scala: { versionIndex: "3" },
    bash: { versionIndex: "3" },
    sql: { versionIndex: "3" },
    pascal: { versionIndex: "2" },
    csharp: { versionIndex: "3" },
    php: { versionIndex: "3" },
    swift: { versionIndex: "3" },
    rust: { versionIndex: "3" },
    r: { versionIndex: "3" },
  };
  


async function compileCode(language,code){
    try {
        const response = await axios.post('https://api.jdoodle.com/v1/execute', {
            script: 'print("Hello, World!")',
            language: "python3",
            versionIndex: "3",
            clientId: process.env.JDOODLE_ID, 
            clientSecret: process.env.JDOODLE_SECRET,
          });
          
        const data=await response.data
        console.log("compile data is ",data)
        let result={
            data:data,
            error:null
        }
        return result
    } catch (error) {
        let result={
            data:null,
            error:'error in code compilation '+error
        }
        return result
    }
}

module.exports={
    compileCode
}