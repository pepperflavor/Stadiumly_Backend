// import { BlobServiceClient } from '@azure/storage-blob';
// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class AzureService {
//   constructor(private readonly configService: ConfigService) {
//     const connectionString = this.configService.get('AZURE_STORAGE_STRING');

//     // 컨테이너 이름도 숨겨야 하나?
//     const contaninerName = '';

//     const blobServiceClient =
//       BlobServiceClient.fromConnectionString(connectionString);
//     //     this.containerClient = blobServiceClient.getContainerClient(contaninerName);
//   }
// }
