## Offical API Documentation

- [Prisma Cloud APIs](https://pan.dev/prisma-cloud/api/)
- [Perform Config Search V2](https://pan.dev/prisma-cloud/api/cspm/search-config-v-2/)
- [Get The Next Config Search Page](https://pan.dev/prisma-cloud/api/cspm/search-config-page/)

## Postman Data

- [Getting Started](#api-1---login)
  - [Import Files](#api-1---login)
  - [Set Environment Variables](#api-1---login)
  - [Modify Query](#api-1---login)
  - [Make a Request](#api-1---login)
- [Collection](#collection)
  - [Collection Variables](#collection-variables)
  - [Collection APIs](#collection-apis)
    - [1 - login](#api-1---login)
    - [2 - inventory search ](#api-2---inventory-search)
    - [3 - inventory all results](#api-3---inventory-all-results)
- [Environment](#environment)
  - [Environment Variables](#environment-variables)
- [Query Examples](#query-examples)
  - [Return all S3 buckets in AWS Virginia (us-east-1) and AWS California (us-west-1)](#return-all-s3-buckets-in-aws-virginia-us-east-1-and-aws-california-us-west-1)
  - [Return all AWS ECR container images that have been deleted](#return-all-aws-ecr-container-images-that-have-been-deleted)
  - [Return all AWS EKS clusters](#return-all-aws-eks-clusters)
  - [Return all Azure CosmosDB databases](#return-all-azure-cosmosdb-databases)
  - [Return all Azure compute resources in East US 2 in resource groups matching the name MC_ (AKS managed node-group)](#return-all-azure-compute-resources-in-east-us-2-in-resource-groups-matching-the-name-mc_-aks-managed-node-group)

### Collection

 | Name |  File  | 
 |------|--------|
 | Prisma Cloud Inventory | `Prisma Cloud Inventory.postman_collection.json`

---

#### Collection Variables

 | Name |  Type  | Assignment  | 
 |------|--------|-------------|
 | limit | `integer` | Static
 | withResourceJson | `boolean` | Static
 | startTime | `integer` | Dynamic (default) or Static
 | skipResult | `boolean` | Static
 | sortField | `string` | Static
 | sortDirection | `string` | Static
 | query | `string` | Static

<br />

> [!NOTE]
> The startTime varaible should be in Unix epoch timestamp. When the initial
> login is initiated there is a [script](#script) that will set the current time to the
> current time minus 24 hours.

<br />

---

#### Collection APIs

 | Name | Method | Endpoint | Script |
 |------|--------|----------|--------|
 | 1 - login | `POST` | /login | `true`
 | 2 - inventory search | `POST` | /search/api/v2/config | `true`
 | 3 - inventory all results | `POST` | /search/config/page | `false`

----
#### **API: 1 - login**

<br />

**Body**

```json
{
    "username": "{{prismaCloudApiKey}}",
    "password": "{{prismaCloudApiSecret}}"
}
```

<br />

##### Script

```JavaScript
const jsonData = pm.response.json();
pm.environment.set("prismaCloudBearerToken", jsonData.token);

const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
pm.collectionVariables.set('startTime', oneDayAgo.getTime());
```

----
#### **API: 2 - inventory search**

<br />

**Body**

```json
{
  "limit": {{limit}},
  "withResourceJson": {{withResourceJson}},
  "startTime": {{startTime}},
  "skipResult": {{skipResult}},
  "sort": [
    {
      "field": "{{sortField}}",
      "direction": "{{sortDirection}}"
    }
  ],
  "query": "{{query}}"
}
```

<br />

**Script**

```JavaScript
var jsonData = pm.response.json();
pm.environment.set("nextPageToken", jsonData.nextPageToken);
```

----
#### **API: 3 - inventory all results**

<br />

**Body**

```json
{
  "limit": {{limit}},
  "withResourceJson": {{withResourceJson}},
  "pageToken": "{{nextPageToken}}"
}
```
---

<br />
<br />

### Environment

 | Name |  File  | 
 |------|--------|
 | Prisma Cloud Inventory | `Prisma Cloud Inventory.postman_environment.json`

---

#### Environment Variables

 | Name |  Type  | Assignment  | 
 |------|--------|-------------|
 | prismaCloudApiKey | `string` | Static
 | prismaCloudApiSecret | `securestring` | Static
 | prismaCloudURL | `string` | Static
 | prismaCloudBearerToken | `securestring` | Dynamic
 | nextPageToken | `securestring` | Dynamic

 ---

<br />
<br />

## Query Examples


#### Return all S3 buckets in AWS Virginia (us-east-1) and AWS California (us-west-1)

```shell
config from cloud.resource where cloud.type = 'aws' AND cloud.service = 'Amazon S3' AND api.name = 'aws-s3api-get-bucket-acl' AND cloud.region IN ('AWS Virginia', 'AWS California' )
```

#### Return all AWS ECR container images that have been deleted

```shell
config from cloud.resource where cloud.type = 'aws' AND cloud.service = 'Amazon ECR' AND api.name = 'aws-ecr-image' AND resource.status = Deleted
```

#### Return all AWS EKS clusters

```shell
config from cloud.resource where cloud.type = 'aws' AND cloud.service = 'Amazon EKS' AND api.name = 'aws-eks-describe-cluster'
```

#### Return all Azure CosmosDB databases

```shell
config from cloud.resource where cloud.type = 'azure' AND cloud.service = 'Azure CosmosDB' AND api.name = 'azure-cosmos-db'
```

#### Return all Azure compute resources in East US 2 in resource groups matching the name MC_ (AKS managed node-group)

```shell
config from cloud.resource where cloud.type = 'azure' AND cloud.service = 'Azure Compute' AND cloud.region IN ( 'Azure East US 2' ) AND azure.resource.group matches 'MC_'
```