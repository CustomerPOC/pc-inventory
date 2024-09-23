##

[Perform Config Search V2](https://pan.dev/prisma-cloud/api/cspm/search-config-v-2/)


## Collection Variables to Set

 | name |  setting  | description |
 |----|----------|-------------|
 | prismaCloudApiKey | Prisma Cloud Security Principal | Prisma Cloud access key
 | prismaCloudApiSecret | Prisma Cloud Principal Secret | Password/secret value for username or access key
 | prismaCloudURL | Prisma Cloud Base URL | Your Prisma Cloud app stack URL in the format: https://apix.prismacloud.io where apix is your app-stack (api2, etc.)
 | query | RQL query for API call | Example to return EC2 instances: `"config from cloud.resource where cloud.type = 'aws' AND cloud.service = 'Amazon EC2' AND api.name = 'aws-ec2-describe-instances'"`