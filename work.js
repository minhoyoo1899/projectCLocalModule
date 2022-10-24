import fs from 'fs';
import path from 'path';


fs.readFile("./public/index.html", "utf-8", (err, data) => { 
  if(data === "<")
  
  console.log(data + "hello minho");
  
});
