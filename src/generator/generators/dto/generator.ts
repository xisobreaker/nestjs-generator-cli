import GeneratorComposite from "../generator-composite";
import CreateDtoGenerator from "./create/generator";
import UpdateDtoGenerator from "./update/generator";


export default class DtoGenerator extends GeneratorComposite {
  constructor() {
    super('dto');

    this.addGenerators(new CreateDtoGenerator());
    this.addGenerators(new UpdateDtoGenerator());
  }
}