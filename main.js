import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";
import path, { join } from "path";
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config()

const fsPromises = fs.promises;

const account = process.env.ACCOUNT;

const accountKey = process.env.ACCOUNT_KEY;

const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential
);

const containerName = process.env.CONTAINER_NAME;

async function main() {

    const containerClient = blobServiceClient.getContainerClient(containerName);

    const blobs = containerClient.listBlobsFlat();

    for await (const blob of blobs) {
        const blobClient = containerClient.getBlobClient(blob.name);
        await blobClient.downloadToFile(join("backup", blob.name));
        console.log(`Downloaded blob "${blob.name}" successfully`);
    }
}

fsPromises.mkdir('backup').then(() => {
    main();
}).catch((err) => {
    throw new Error(`Failed to create backup`);
});

