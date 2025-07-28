import { homedir } from "os";
/**
 * This utility is similar to the Linux command `envsubst`
 *
 * > substitutes environment variables in shell format strings
 */
export class Envsubst {
  private extraVars: Map<string, string>;
  private home: string;

  constructor(extraVars?: Map<string, string>) {
    this.extraVars = extraVars || new Map<string, string>();
    this.home = homedir();
    if (!this.extraVars.has("HOME")) this.extraVars.set("HOME", this.home);
  }

  setVar(name: string, value: string) {
    this.extraVars.set(name, value);
  }

  subst(input: string): string;
  subst(input: string[]): string[];
  subst(input: string | string[]): string | string[] {
    if (Array.isArray(input)) return input.map((it) => this.subst(it));
    if (typeof input !== "string") return input;
    const { extraVars } = this;
    if (input.startsWith("~/")) input = this.home + input.slice(1);
    return input.replace(/\$\{(\w+)([-?]?)\}/g, envReplacer);

    function envReplacer(matched: string, name: string, isOptional?: string): string {
      if (extraVars && extraVars.has(name)) return extraVars.get(name) || "";
      if (Object.prototype.hasOwnProperty.call(process.env, name)) return process.env[name] || "";
      if (!isOptional) throw new Error(`The required env var \`${name}\` is missing`);
      return "";
    }
  }
}
