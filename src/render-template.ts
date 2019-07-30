import * as util from "util";
import * as fs from "fs";
import { template } from "lodash";

const promisifiedFsReadFile = util.promisify(fs.readFile);
const promisifiedFsWriteFile = util.promisify(fs.writeFile);

const renderTemplate = async (templateData: object, templateFilePath: string): Promise<any> => {
  const file = await promisifiedFsReadFile(templateFilePath, "utf8");
  const compile = template(file);
  return promisifiedFsWriteFile(templateFilePath, compile(templateData));
};

export default renderTemplate;
