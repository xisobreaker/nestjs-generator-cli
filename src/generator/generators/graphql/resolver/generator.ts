import path from "path";
import { TableInfo } from "../../../table-query";
import { toCamelCase, toKebabCase, toPascalCase } from "../../../../common/case-utils";
import GeneratorComponent from "../../generator-component";
import { GeneratorConfig } from "../../../configure";

interface GqlResolverTemplateParams {
  kebabName: string;
  pascalName: string;
  camelName: string;
  extendImports: string;
  resolverFields: string;
  declareServices: string;
}

export default class GqlResolverGenerator extends GeneratorComponent {
  constructor() {
    super('.resolver.ts', path.join(__dirname, 'template.ts.ejs'));
  }

  protected operator(tableInfo: TableInfo, configParam: GeneratorConfig): Record<string, any> {
    const kebabName = toKebabCase(tableInfo.tableName);
    const pascalName = toPascalCase(tableInfo.tableName);
    const camelName = toCamelCase(tableInfo.tableName);
    // 扩展字段
    const extendFields: string[] = [];
    // 要导入的服务
    const importServices: string[] = [];

    if (tableInfo.foreignKeys.length > 0) {
      tableInfo.foreignKeys.forEach((item) => {
        const fieldName = `${toCamelCase(item.keyColumnUsage.columnName)}`;
        extendFields.push([
          `  @ResolveField('${fieldName}Obj')`,
          `  async ${fieldName}Obj(@Parent() parent: any) {`,
          `    return this.${toCamelCase(item.referencedTableName)}Service.findByPk(parent.${fieldName});`,
          `  }`
        ].join('\n'));

        if (item.referencedTableName !== tableInfo.tableName) {
          if (!importServices.includes(item.referencedTableName)) {
            importServices.push(item.referencedTableName);
          }
        }
      });
    }

    if (tableInfo.references.length > 0) {
      tableInfo.references.forEach((item) => {
        const fieldName = `${toCamelCase(item.keyColumnUsage.tableName)}${toPascalCase(item.keyColumnUsage.columnName)}`;
        extendFields.push([
          `  @ResolveField('${fieldName}')`,
          `  async ${fieldName}(@Parent() parent: any) {`,
          `    return this.${toCamelCase(item.keyColumnUsage.tableName)}Service.findAll({`,
          `      where: { ${toCamelCase(item.keyColumnUsage.columnName)}: parent.${toCamelCase(item.keyColumnUsage.referencedColumnName)} }`,
          `    });`,
          `  }`
        ].join('\n'));

        if (item.tableName !== tableInfo.tableName) {
          if (!importServices.includes(item.tableName)) {
            importServices.push(item.tableName);
          }
        }
      });
    }

    const importServiceContent = importServices.map((name) => {
      return `import { ${toPascalCase(name)}Service } from '../${toKebabCase(name)}/${toKebabCase(name)}.service';`
    }).join('\n');
    const declareServiceContent = importServices.map((name) => {
      return `    private readonly ${toCamelCase(name)}Service: ${toPascalCase(name)}Service,`
    }).join('\n');

    const templateParams: GqlResolverTemplateParams = {
      kebabName,
      pascalName,
      camelName,
      extendImports: importServiceContent ? importServiceContent.concat('\n') : '',
      declareServices: declareServiceContent ? `\n${declareServiceContent}` : '',
      resolverFields: extendFields.join('\n\n'),
    };
    return templateParams;
  }
}
