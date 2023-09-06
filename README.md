# Azure Blobs to local

### Script To Download Azure Blobs Locally

> Create a .env file with the following environment variables

-   ACCOUNT_KEY
-   CONTAINER
-   ACCOUNT_NAME

ACCOUNT_KEY is the Azure access key for the account. CONTAINER is the container's name, and ACCOUNT_NAME is the name of the account under which the blob container is located.

Then, run the following commands to create a local backup for the blobs.

```npm i``` 

```npm run start```

Once the program finishes successfully, the data can be found under the backup directory.