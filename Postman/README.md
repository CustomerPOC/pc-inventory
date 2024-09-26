##

Offical API Documentation

[Perform Config Search V2](https://pan.dev/prisma-cloud/api/cspm/search-config-v-2/)

[Get The Next Config Search Page](https://pan.dev/prisma-cloud/api/cspm/search-config-page/)


## Postman Collection

Scripts

Login

```JavaScript
const jsonData = pm.response.json();
pm.collectionVariables.set("prismaCloudBearerToken", jsonData.token);

const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
pm.collectionVariables.set('startTime', oneDayAgo.getTime());
```

Inventory Search

```JavaScript
var jsonData = pm.response.json();
pm.collectionVariables.set("nextPageToken", jsonData.nextPageToken);
```


### Collection Variables

 | Name |  Setting  | Description | Example
 |------|-----------|-------------|---------
 | prismaCloudApiKey | Prisma Cloud Security Principal | Prisma Cloud access key | edacf3ca-947a-48a1-bafd-b44626a4c047
 | prismaCloudApiSecret | Prisma Cloud Principal Secret | Password/secret value for username or access key | xxxxxxxxxxxx
 | prismaCloudURL | Prisma Cloud API URL | Your Prisma Cloud app-stack API URL | https://api2.prismacloud.io


 | Name |  Type  | Assignment  | 
 |------|--------|-------------|
 | prismaCloudApiKey | `string` | Static
 | prismaCloudApiSecret | `string` | Static
 | prismaCloudURL | `string` | Static
 | limit | `integer` | Static
 | withResourceJson | `boolean` | Static
 | startTime | `integer` | Dynamic (default) or Static
 | skipResult | `boolean` | Static
 | sortField | `string` | Static
 | sortDirection | `string` | Static
 | query | `string` | Static
 | prismaCloudBearerToken | `string` | Dynamic
 | nextPageToken | `string` | Dynamic

> [!NOTE]
> The startTime varaible should be in UNIX EPOCH format.
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