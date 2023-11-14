import multiparty from 'multiparty';
import {S3Client} from '@aws-sdk/client-s3'
const BucketName='nextj-ecommerce-admin';
import {PutObjectCommand} from '@aws-sdk/client-s3';
import mime from 'mime-types';
import fs from 'fs';
export default async function handle(req,res){
    const form = new multiparty.Form();
    const {fields,files} = await new Promise((resolve,reject)=>{
        form.parse(req,(err,fields,files)=>{
            if (err) reject(err);
            resolve({fields,files});
            
        });
    });
            const client = new S3Client({
                region: 'us-east-1',
                credentials: {
                    accessKeyId: process.env.S3_ACCESS_KEY,
                    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
                },
            });
            const links=[];
            for(const file of files.file){
                const ext = file.originalFilename.split('.').pop();
                const newFileName = Date.now() + '.' + ext;
                await client.send(new PutObjectCommand({
                Bucket: BucketName,
                Key: newFileName,
                Body: fs.readFileSync(file.path),
                ACL: 'public-read',
                ContentType: mime.lookup(file.path) ,
            }));
            const link = `https://${BucketName}.s3.amazonaws.com/${newFileName}`;
            links.push(link);
        }
           return res.json({links});

}
export const config = {
    api:{bodyParser:false}
};