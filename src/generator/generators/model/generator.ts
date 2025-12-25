import { TableInfo } from "../../table-query";
import AbstractGenerator from "../abstract-generator";

export default class ModelGenerator extends AbstractGenerator {
  private suffixName = '.model.ts';

  constructor() {
    super();
  }

  protected operator(tableInfo: TableInfo, outputDir: string): void {

  }
}
