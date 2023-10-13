import { Product } from "@/_models/Product";
import { useEffect } from "react";
import { executeSerial } from "../../../electron/core/plugin-manager/execution/extension-manager";
import { DataService, ModelManagementService } from "../../shared/coreService";
import { useAtom } from "jotai";
import { downloadedModelAtom } from "@/_helpers/atoms/DownloadedModel.atom";
import { AssistantModel } from "@/_models/AssistantModel";

export function useGetDownloadedModels() {
  const [downloadedModels, setDownloadedModels] = useAtom(downloadedModelAtom);

  useEffect(() => {
    getDownloadedModels().then((downloadedModels) => {
      setDownloadedModels(downloadedModels);
    });
  }, []);

  return { downloadedModels };
}

export async function getDownloadedModels(): Promise<AssistantModel[]> {
  const downloadedModels: AssistantModel[] = await executeSerial(
    DataService.GET_FINISHED_DOWNLOAD_MODELS
  );
  return downloadedModels ?? [];
}

export async function getConfiguredModels(): Promise<Product[]> {
  return executeSerial(ModelManagementService.GET_CONFIGURED_MODELS);
}