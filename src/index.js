import "dotenv/config.js"
import getFollowers from './twitter/tw-util.js';
import createDump from "./util/file-man.js";
import readline from 'readline/promises'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



(async () => {

    const answer = await rl.question('Enter the twitter username: ');
    rl.close();

    const data = await getFollowers(answer);

    //create dump file containing the usernames;
    await createDump(data);
    console.log('Done!');
})();
