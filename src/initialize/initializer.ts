import { initGeneratorConfig } from "../generator/configure";

export const initProject = async () => {
  initGeneratorConfig(process.cwd());
};