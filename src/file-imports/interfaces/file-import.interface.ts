import { FileImportTypesEnum } from '../enums/file-import-types.enum';

export interface FileImport {
  id?: string;
  filePath: string;
  type: FileImportTypesEnum;
}
