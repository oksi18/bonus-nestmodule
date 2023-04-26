import { ApiProperty } from '@nestjs/swagger';

export class PetDto {
  @ApiProperty({
    description: 'The name of the user',
    type: String,
    example: 'John Doe',
  })
  name: string;
  @ApiProperty({
    description: 'The type of the user',
    type: String,
    example: 'vfghjkl',
  })
  type: string;
  @ApiProperty({
    description: 'The image of the user',
    type: String,
    example: 'vbhjk',
  })
  image: string;
  @ApiProperty({
    description: 'The logo of the user',
    type: String,
    example: 'Jfghjkm,',
  })
  logo: string;
  @ApiProperty({
    description: 'The status of the user',
    type: Boolean,
    example: 'dfghjkll',
  })
  status: boolean;
}
