import type { OpenAIModel, OpenAIModelsResult, OpenAIModelWithUpstream } from "../api-types.ts";

export class ModelsManager {
  private models: OpenAIModelWithUpstream[] = [];

  update(upstream: string, models: OpenAIModel[]) {
    const removedModels = new Set<string>();
    const updateModels = this.models.filter((it) => {
      if (it.upstream !== upstream) return true;
      removedModels.add(it.id);
      return false;
    });

    const newModels: string[] = [];
    for (const model of models) {
      if (removedModels.has(model.id)) removedModels.delete(model.id);
      else newModels.push(model.id);
      updateModels.push({ ...model, upstream });
    }
    this.models = updateModels;
    return { removedModels: Array.from(removedModels), newModels };
  }

  findByModelId(id: string) {
    return this.models.filter((it) => it.id === id);
  }

  getResponse(overrideOwner?: string): OpenAIModelsResult {
    const sameIds = new Set<string>();
    const resp: OpenAIModelsResult = { object: "list", data: [] };
    for (const model of this.models) {
      if (sameIds.has(model.id)) continue;
      const m = { ...model };
      delete (m as Partial<OpenAIModelWithUpstream>).upstream;
      if (overrideOwner) m.owned_by = overrideOwner;
      resp.data.push(m);
      sameIds.add(model.id);
    }
    return resp;
  }
}
