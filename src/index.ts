import * as mod from 'libxmljs';
import * as path from 'path';

const xsd = 'saml-schema-protocol-2.0.xsd';

export default {
  validate: (xml: string) => {
    return new Promise((resolve, reject) => {
      process.chdir(path.resolve(__dirname, './schemas'));
      const xsdDoc = mod.parseXml(xsd);
      const xmlDoc = mod.parseXml(xml);
      const result = xmlDocValid.validate(xsdDoc);
      if (result) {
        return resolve('SUCCESS_VALIDATE_XML');
      } else {
        return reject('ERR_INVALID_XML');
      }
    });
  }
};
