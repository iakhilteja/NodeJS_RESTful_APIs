const fs = require('fs');
const path = require('path');

const lib = {};
lib.baseDir = path.join(__dirname, '/../.data/');
console.log(lib.baseDir);

lib.create = (dir, file, data, callback)=>{
    fs.open(lib.baseDir + dir + '/' + file + '.json' ,'wx' ,(err,fileDescriptor) =>{
        if(!err && fileDescriptor){
            const stringData = JSON.stringify(data);
            fs.writeFile(fileDescriptor, stringData, (err)=>{
                
                if(!err){
                    fs.close(fileDescriptor, (data)=>{
                        if(!err){
                            callback(false);
                        }else{
                            callback('Error closing new File');
                        }
                    })

                }else{
                    callback('Error writing a new File')
                }
               
            })
           
        } else{
            callback('Couldnt  create a new file, it may be there already');
        }
    })
}

lib.read = (dir,file,callback)=>{
    fs.readFile(lib.baseDir+dir+'/'+file + '.json','utf-8',(err,data)=>{
        callback(err,data);
    })
}

lib.update = (dir,file,data,callback)=>{
    // console.log(lib.baseDir + dir + '/'+ file + '.json' );
fs.open(lib.baseDir + dir + '/'+ file + '.json','r+', (err,fileDescriptor)=>{
    if(!err && fileDescriptor){
        const stringData = JSON.stringify(data);
        fs.ftruncate(fileDescriptor,(err)=>{
            if(!err){
                fs.writeFile(fileDescriptor,stringData,(err)=>{
                    if(!err){
                        fs.close(fileDescriptor,(err)=>{
                            if(!err){
                                callback(false);
                            }else{
                                callback('error in closing the file');
                            }
                        })
                    }else{
                        callback('Error in writing to Existing file');
                    }
                })
            }else{
                callback('error in truncating the file');
            }
        })
    }else{
        callback('error in opening the file');
    }
})
}


lib.delete = (dir, file,callback)=>{
    fs.unlink(lib.baseDir+dir+'/'+ file + '.json',(err)=>{
        if(!err){
            callback(false);
        }else{
            callback('error in deleting file');
        }
    })
}

module.exports= lib;