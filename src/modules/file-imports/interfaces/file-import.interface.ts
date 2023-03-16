import { FileImportTypesEnum } from '../constants/file-import-types.enum';

export interface FileImport {
  id?: string;
  filePath: string;
  type: FileImportTypesEnum;
}
