import https from 'https'
export default async function getFacebookID(token){
    return new Promise((res, rej) => {
        let data = ''
        https.get(`https://graph.facebook.com/me?fields=id&access_token=${token}`, (resp) => {
            resp.on('data', (chunk) => {
                data += chunk
            })
            resp.on('end', () => {
                data = JSON.parse(data)
                if(data.id){
                    res(data.id)
                    return
                }
                rej()
            })
    
        }).on("error", () => {
            rej()
        })
    })
}