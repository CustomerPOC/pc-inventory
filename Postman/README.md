##

[Perform Config Search V2](https://pan.dev/prisma-cloud/api/cspm/search-config-v-2/)


## Collection Variables to Set

 | name |  setting  | description | example
 |------|-----------|-------------|---------
 | prismaCloudApiKey | Prisma Cloud Security Principal | Prisma Cloud access key | edacf3ca-947a-48a1-bafd-b44626a4c047
 | prismaCloudApiSecret | Prisma Cloud Principal Secret | Password/secret value for username or access key | xxxxxxxxxxxx
 | prismaCloudURL | Prisma Cloud Base URL | Your Prisma Cloud app stack API URL | https://api2.prismacloud.io


## Query Parameters

 | name |  setting  | description | example
 |------|-----------|-------------|---------
 | query | RQL query | Config query to search inventory | `"config from cloud.resource where cloud.type = 'aws' AND cloud.service = 'Amazon EC2' AND api.name = 'aws-ec2-describe-instances'"`
| query | RQL query | Config query to search inventory | `"config from cloud.resource where cloud.type = 'aws' AND cloud.service = 'Amazon EC2' AND api.name = 'aws-ec2-describe-instances'"`
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