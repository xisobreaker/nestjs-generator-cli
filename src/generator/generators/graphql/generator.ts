import GeneratorComposite from "../generator-composite";
import GqlResolverGenerator from "./resolver/generator";
import GqlSchemaGenerator from "./schema/generator";

export default class GqlGenerator extends GeneratorComposite {
  constructor() {
    super('');

    this.addGenerators(new GqlResolverGenerator());
    this.addGenerators(new GqlSchemaGenerator());
  }
}