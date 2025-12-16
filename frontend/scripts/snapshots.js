const http=require('http');
const fs=require('fs');
const path=require('path');
const urls=['/','/auth/register','/auth/login','/jobs','/services','/contact'];
const outdir=path.join(__dirname,'..','test','snapshots');
fs.mkdirSync(outdir,{recursive:true});
urls.forEach(p=>{
  const filename=(p==='/'? 'home': p.replace(/[\/?&=]/g,'_').replace(/^_/,''));
  const filepath=path.join(outdir, filename+'.html');
  http.get({host:'localhost',port:3000,path:p,timeout:5000},res=>{
    let d='';
    res.on('data',c=>d+=c);
    res.on('end',()=>{
       fs.writeFileSync(filepath,d,'utf8');
       console.log(p+' -> '+res.statusCode+' saved '+filepath);
    });
  }).on('error',e=>{
    fs.writeFileSync(filepath,`ERROR: ${e.message}`,'utf8');
    console.log(p+' -> ERROR '+e.message+' saved '+filepath);
  });
});
