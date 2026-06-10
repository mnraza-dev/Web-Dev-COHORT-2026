import fs from "node:fs";

// fs.writeFile('test-async-01.txt','Helloo  there !',(err)=>{
//     if(err){
//         console.log(err)
//     }
// })

fs.readFile('test-async-01.txt','utf-8',(err,data)=>{
    if(err){
        console.log(err)
    }
    console.log("READ- ",data)
})

