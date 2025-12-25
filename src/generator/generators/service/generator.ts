import { TableInfo } from "../../table-query";
import AbstractGenerator from "../abstract-generator";

export default class ServiceGenerator extends AbstractGenerator {
  private suffixName = '.service.ts';

  constructor() {
    super();
  }

  protected operator(tableInfo: TableInfo, outputDir: string): void {

  }
}
