import fs from "node:fs";

// fs.writeFile('test-async-01.txt','Helloo  there !',(err)=>{
//     if(err){
//         console.log(err)
//     }
// })

// fs.readFile('test-async-01.txt','utf-8',(err,data)=>{
//     if(err){
//         console.log(err)
//     }
//     console.log("READ- ",data)
// })

fs.readFile('a.txt','utf-8',(err,data)=>{
    if(err){
        console.log(err)
    }
    fs.writeFile('b.txt',data,(err)=>{
        if(err){
            console.log(err)
        }
        fs.appendFile('b.txt','\nDone!',(err)=>{
            if(err){
                console.log(err)
            }
            fs.unlink('a.txt',(err)=>{
                if(err){
                    console.log(err)
                }
                console.log('a.txt deleted successfully!')
            })
        });

    })
    
});


