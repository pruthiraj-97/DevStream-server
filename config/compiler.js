const axios=require('axios')

const languageConfig = {
    python3: "3",
    java: "3",
    cpp: "4",
    nodejs: "3",
    c: "4",
    ruby: "3",
    go: "3",
    scala: "3",
    bash: "3",
    sql: "3",
    pascal: "2",
    csharp: "3",
    php: "3",
    swift: "3",
    rust: "3",
    r: "3",
  };
  
  const languageServer={
    javascript:'nodejs',
    python:'python3',
    cpp:"cpp",
    java:"java"
  }


async function compileCode(language,code){
    try {
        const serverlanguage=languageServer[language]
        console.log("server language",serverlanguage)
        if(!serverlanguage){
            return {
                data:null,
                error:'language not supported'
            }
        }
        const response = await axios.post('https://api.jdoodle.com/v1/execute', {
            script:code,
            language: serverlanguage,
            versionIndex:languageConfig.nodejs,
            clientId: process.env.JDOODLE_ID, 
            clientSecret: process.env.JDOODLE_SECRET,
          });
          
        const data=await response.data
        let result={
            data:data,
            error:null
        }
        return result
    } catch (error) {
        console.log(error)
        let result={
            data:null,
            error:'error in code compilation '
        }
        return result
    }
}

module.exports={
    compileCode
}