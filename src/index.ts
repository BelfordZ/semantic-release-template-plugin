import * as path from "path";
import checkExists from "./check-exists";
import SemanticReleaseError from "./semantic-release-error";
import errors from "./definitions/errors";
import renderTemplate from "./render-template";

interface IPluginConfig {
  documentLocation: string;
  templateData: object;
}

interface IContext {
  nextRelease?: {
    version?: string;
  };
}

type PluginFunction = (pluginConfig: IPluginConfig, context: IContext) => any;

let verified: boolean = false;

export const verifyConditions: PluginFunction = async (pluginConfig, context): Promise<boolean> => {
  if (!pluginConfig.documentLocation) {
    const noDocumentError = errors.ENODOCUMENT();
    throw new SemanticReleaseError(noDocumentError.message, noDocumentError.code, noDocumentError.details);
  }

  const config: IPluginConfig = {
    documentLocation: pluginConfig.documentLocation,
    templateData: pluginConfig.templateData,
  };

  const exists = await checkExists(path.resolve(process.cwd(), config.documentLocation!));
  if (!exists) {
    const noDocumentError = errors.ENODOCUMENT();
    throw new SemanticReleaseError(noDocumentError.message, noDocumentError.code, noDocumentError.details);
  }

  verified = true;
  return verified;
};

export const prepare: PluginFunction = async (pluginConfig, context): Promise<boolean> => {
  if (!verified) {
    throw new SemanticReleaseError("Not verified", "ENOTVERIFIED", "Something went wrong and the openrpc.json was not able to be verified."); //tslint:disable-line
  }
  if (!context || !context.nextRelease || !context.nextRelease.version) {
    throw new SemanticReleaseError("No nextRelease version", "ENOVERSION", "Something went wrong and there is no next release version"); //tslint:disable-line
  }

  const config: IPluginConfig = {
    documentLocation: pluginConfig.documentLocation,
    templateData: pluginConfig.templateData,
  };

  return renderTemplate(
    {
      ...config.templateData,
      version: context.nextRelease.version,
    },
    path.resolve(process.cwd(), config.documentLocation),
  ).then(() => true);
};
