import { TwitterApi, ApiResponseError } from "twitter-api-v2";

const twClient = new TwitterApi(process.env.BEARER);

async function getTwitterId(name){
    const resp = await twClient.v2.userByUsername(name)
    const {id} = resp.data ?? {}
    return id;
}

async function getFollowersById(user){
    const data = await twClient.v2.followers(user, {asPaginator: true, max_results: 1000});
    let ratelimit = -1;

    while(!data.done){
	if(Date.now() < ratelimit){
	    continue;
	}
	try{   
	    await data.fetchNext();
	}catch(error){
	    if (error instanceof ApiResponseError && error.rateLimitError && error.rateLimit) {
		ratelimit = error.rateLimit.reset*1000; //timestamp is in seconds.
		console.log(`Rate limit hit, executing remaining requests at: ${new Date(ratelimit).toLocaleString()}`);
	    }
	}
    }

    return data.users;
}


async function getFollowers(user){
    let data = null;
    
    const id = await getTwitterId(user);

    if(!id){
	return data;
    }

    data = await getFollowersById(id);

    return data;
}

export default getFollowers;
