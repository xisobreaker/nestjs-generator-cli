import { TableInfo } from "../../table-query";
import AbstractGenerator from "../abstract-generator";

export default class InterfaceGenerator extends AbstractGenerator {
  private suffixName = '.interface.ts';

  constructor() {
    super();
  }

  protected operator(tableInfo: TableInfo, outputDir: string): void {

  }
}
