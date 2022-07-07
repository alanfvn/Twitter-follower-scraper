import fs from 'fs';

async function createDump(data){ 
    
    let data2write = '';

    for(const user of data){

	const {username} = user;
	
	data2write += username+"\n";
    }

    await fs.promises.writeFile('./output.txt', data2write);
}


export default createDump;
