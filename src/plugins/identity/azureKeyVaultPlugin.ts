import Serverless from "serverless";
import { AzureBasePlugin } from "../azureBasePlugin";
import { AzureKeyVaultService } from "../../services/azureKeyVaultService";

export class AzureKeyVaultPlugin extends AzureBasePlugin {
  public constructor(serverless: Serverless, options: Serverless.Options) {
    super(serverless, options);
    this.hooks = {
      "after:deploy:deploy": this.link.bind(this)
    };
  }

  private async link() {
    const keyVaultConfig = this.serverless.service.provider["keyVault"];
    if (!keyVaultConfig) {
      return Promise.resolve();
    }
    this.log("Starting KeyVault service setup");

    const keyVaultService = new AzureKeyVaultService(this.serverless, this.options);
    await keyVaultService.setPolicy(keyVaultConfig);

    this.log("Finished KeyVault service setup");
  }
}
