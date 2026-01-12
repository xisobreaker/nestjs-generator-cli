import path from "path";
import { TableInfo } from "../../table-query";
import { toCamelCase, toKebabCase, toPascalCase } from "../../../common/case-utils";
import GeneratorComponent from "../generator-component";
import { GeneratorConfig } from "../../configure";

interface ModuleTemplateParams {
  kebabName: string;
  pascalName: string;
  camelName: string;
  importStr: string;
  providerStr: string;
}

export default class ModuleGenerator extends GeneratorComponent {
  constructor() {
    super('.module.ts', path.join(__dirname, 'template.ts.ejs'));
  }

  private getProviderCodes(tableInfo: TableInfo) {
    const serviceList: string[] = [];
    tableInfo.foreignKeys.forEach((rc) => {
      if (tableInfo.tableName === rc.referencedTableName) {
        return;
      }
      if (serviceList.includes(`, ${toPascalCase(rc.referencedTableName)}Service`)) {
        return;
      }
      serviceList.push(rc.referencedTableName);
    });
    tableInfo.references.forEach((rc) => {
      if (tableInfo.tableName === rc.tableName) {
        return;
      }
      if (serviceList.includes(`, ${toPascalCase(rc.tableName)}Service`)) {
        return;
      }
      serviceList.push(rc.tableName);
    });

    return {
      providerList: serviceList.map((s) => `, ${toPascalCase(s)}Service`),
      importList: serviceList.map((s) => `import { ${toPascalCase(s)}Service } from '../${toKebabCase(s)}/${toKebabCase(s)}.service';`),
    };
  }

  protected operator(tableInfo: TableInfo, configParam: GeneratorConfig): Record<string, any> {
    const kebabName = toKebabCase(tableInfo.tableName);
    const pascalName = toPascalCase(tableInfo.tableName);
    const camelName = toCamelCase(tableInfo.tableName);

    const { providerList, importList } = this.getProviderCodes(tableInfo);
    const providerStr = providerList.join('');
    let importStr = importList.join('\n');
    if (importStr !== '') {
      importStr = importStr.concat('\n');
    }

    const templateParams: ModuleTemplateParams = {
      kebabName,
      pascalName,
      camelName,
      importStr,
      providerStr,
    };
    return templateParams;
  }
}
