import { readFileSync } from "fs";
import ejs from 'ejs';

export const loadTemplate = (templatePath: string) => {
  return readFileSync(templatePath, 'utf8');
}

export class EJSTemplateEngine {
  private template: string;

  constructor(templatePath: string) {
    this.template = loadTemplate(templatePath);
  }

  render(params: Record<string, any>): string {
    return ejs.render(this.template, params);
  }
}