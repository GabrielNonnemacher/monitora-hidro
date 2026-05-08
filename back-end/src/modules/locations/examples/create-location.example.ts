import { CreateLocationPointDto } from '../dto/create-location.dto';

export const CreateLocationPointDtoExample = {
  schema: {
    example: {
      cityId: 0,
      name: 'Location Name',
      default: 0,
      attention: 0,
      flood: 0,
      extreme: 0,
      active: true,
    } as CreateLocationPointDto,
  },
};
