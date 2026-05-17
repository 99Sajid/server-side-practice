import type { IncomingMessage } from "http";

export const parseBody = (req:IncomingMessage):Promise<any>=>{
    return new Promise((resolve, reject)=>{
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const jsonData = JSON.parse(body);
                resolve(jsonData);
            } catch (error) {
                reject(error);
            }
        });
    })

}