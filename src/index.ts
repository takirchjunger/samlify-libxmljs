import * as fs from 'fs';
import * as mod from 'libxmljs';
import * as path from 'path';

const xsd = fs.readFileSync(path.resolve(__dirname, 'schemas/saml-schema-protocol-2.0.xsd'), 'utf-8');
const xsdDoc = mod.parseXml(xsd);

interface IValidatorContext {
  validate?: (xml: string) => Promise<any>;
}

export default class LibxmljsValidator implements IValidatorContext {
  public validate(xml: string) {
    return new Promise((resolve, reject) => {
      process.chdir(path.resolve(__dirname, 'schemas'));
      const xmlDoc = mod.parseXml(xml);
      const result = xmlDoc.validate(xsdDoc);
      if (result) {
        return resolve('SUCCESS_VALIDATE_XML');
      } else {
        return reject('ERR_INVALID_XML');
      }
    });
  }
}
