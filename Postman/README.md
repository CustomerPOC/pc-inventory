##

[Perform Config Search V2](https://pan.dev/prisma-cloud/api/cspm/search-config-v-2/)


## Collection Variables to Set

 | Name |  Setting  | Description | Example
 |------|-----------|-------------|---------
 | prismaCloudApiKey | Prisma Cloud Security Principal | Prisma Cloud access key | edacf3ca-947a-48a1-bafd-b44626a4c047
 | prismaCloudApiSecret | Prisma Cloud Principal Secret | Password/secret value for username or access key | xxxxxxxxxxxx
 | prismaCloudURL | Prisma Cloud Base URL | Your Prisma Cloud app stack API URL | https://api2.prismacloud.io


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

Find all active EC2 Instances in AWS Virginia (us-east-1), limit to 10 results, and return the full asset JSON.

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