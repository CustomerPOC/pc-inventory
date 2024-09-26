## Offical API Documentation

- [Prisma Cloud APIs](https://pan.dev/prisma-cloud/api/)
- [Perform Config Search V2](https://pan.dev/prisma-cloud/api/cspm/search-config-v-2/)
- [Get The Next Config Search Page](https://pan.dev/prisma-cloud/api/cspm/search-config-page/)

## Postman Data

- [Collection](#collection)
  - [Collection Variables](#collection-variables)
  - [Collection APIs](#collection-apis)
    - [1 - login](#api-1---login)
    - [2 - inventory search ](#api-2---inventory-search)
    - [3 - inventory all results](#api-3---inventory-all-results)

### Collection

 | Name |  File  | 
 |------|--------|
 | Prisma Cloud Inventory | `Prisma Cloud Inventory.postman_collection.json`

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

#### Collection APIs

 | Name | Method | Endpoint | Script |
 |------|--------|----------|--------|
 | 1 - login | `POST` | /login | `true`
 | 2 - inventory search | `POST` | /search/api/v2/config | `true`
 | 3 - inventory all results | `POST` | /search/config/page | `false`

----
#### **API: 1 - login**
----

**Body**

```json
{
    "username": "{{prismaCloudApiKey}}",
    "password": "{{prismaCloudApiSecret}}"
}
```
**Script**

```JavaScript
const jsonData = pm.response.json();
pm.environment.set("prismaCloudBearerToken", jsonData.token);

const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
pm.collectionVariables.set('startTime', oneDayAgo.getTime());
```

----
#### **API: 2 - inventory search**
----

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
**Script**

```JavaScript
var jsonData = pm.response.json();
pm.environment.set("nextPageToken", jsonData.nextPageToken);
```

----
#### **API: 3 - inventory all results**
----

**Body**

```json
{
  "limit": {{limit}},
  "withResourceJson": {{withResourceJson}},
  "pageToken": "{{nextPageToken}}"
}
```

### Environment

 | Name |  File  | 
 |------|--------|
 | Prisma Cloud Inventory | `Prisma Cloud Inventory.postman_environment.json`

#### Environment Variables

 | Name |  Type  | Assignment  | 
 |------|--------|-------------|
 | prismaCloudApiKey | `string` | Static
 | prismaCloudApiSecret | `securestring` | Static
 | prismaCloudURL | `string` | Static
 | prismaCloudBearerToken | `securestring` | Dynamic
 | nextPageToken | `securestring` | Dynamic

 ---

> [!NOTE]
> The startTime varaible should be in Unix epoc timestamp.
> Setting the startTime variable to 0 will search all config data since the start of asset discovery
> 

> [!CAUTION]
> NOT including `resource.status = Active` in your RQL query
> will result in returning all assets including resources that have been deleted.
>
> As many cloud workloads are ephemeral (temporary compute, containers, etc.) this
> results in a large amount of data and should be avoided unless necessary.
>

## Query Parameters

 | Name |  Setting  | Description | Example
 |------|-----------|-------------|---------
 | limit | Number of results | Number of results to return | `50`
| withResourceJson | RQL query | Config query to search inventory | `true`
| startTime | RQL query | Config query to search inventory | `0`
| skipResult | RQL query | Config query to search inventory | `false`
| query | RQL query | Config query to search inventory | `"config from cloud.resource where cloud.type = 'aws' AND cloud.service = 'Amazon EC2' AND api.name = 'aws-ec2-describe-instances'"`


### Postman Body with Parameters

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

### Example Body with Parameters

Find all active EC2 Instances in AWS Virginia (us-east-1) and AWS California (us-west-1), limit to 10 results, and return the full asset JSON.

```json
 {
  "limit": 10,
  "withResourceJson": true,
  "startTime": 0,
  "skipResult": false,
  "sort": [
    {
      "field": "id",
      "direction": "asc"
    }
  ],
  "query": "config from cloud.resource where cloud.type = 'aws' AND cloud.service = 'Amazon EC2' AND api.name = 'aws-ec2-describe-instances' AND cloud.region = 'AWS Virginia' AND resource.status = Active"
}
```

## Query Examples

Return all S3 buckets in AWS Virginia (us-east-1) and AWS California (us-west-1)

```shell
config from cloud.resource where cloud.type = 'aws' AND cloud.service = 'Amazon S3' AND api.name = 'aws-s3api-get-bucket-acl' AND cloud.region IN ('AWS Virginia', 'AWS California' )
```

Return all AWS ECR container images that have been deleted

```shell
config from cloud.resource where cloud.type = 'aws' AND cloud.service = 'Amazon ECR' AND api.name = 'aws-ecr-image' AND resource.status = Deleted
```

Return all AWS EKS clusters

```shell
config from cloud.resource where cloud.type = 'aws' AND cloud.service = 'Amazon EKS' AND api.name = 'aws-eks-describe-cluster'
```