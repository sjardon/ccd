import { readFile, utils } from 'xlsx';

export const fileToJson = (filePath) => {
  try {
    const wb = readFile(filePath);
    return utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
      header: 1,
      range: 1,
      blankrows: false,
      defval: '',
    });
  } catch (error) {
    throw error;
  }
};
