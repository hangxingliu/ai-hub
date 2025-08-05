import { type FSWatcher, watch } from "node:fs";
import { type LoadedConfig, loadConfigFile } from "./loader.ts";
import { COLORS_ALL } from "../utils/colors/index.ts";
import { relative } from "node:path";

/**
 * A class that watches a configuration file for changes and notifies a listener when the file is modified.
 * It uses the Node.js file system watcher to monitor the file and reloads the configuration upon changes.
 */
export class ConfigFileWatcher {
  /**
   * The callback function to invoke when the config file changes, passing the newly loaded configuration.
   * @private
   */
  private _onFileChanged: ((config: LoadedConfig) => void) | undefined;

  /**
   * The file system watcher instance for monitoring the config file.
   * @private
   */
  private watcher?: FSWatcher | undefined;

  /**
   * Constructs a new ConfigFileWatcher instance.
   * @param configFile The path to the configuration file to watch.
   */
  constructor(private readonly configFile: string) {}

  /**
   * Sets up a listener to be notified when the config file changes.
   * The listener will receive the reloaded configuration object.
   * If a watcher is not already active, it initializes one to monitor file changes.
   * Only one listener is supported; calling this multiple times will overwrite the previous listener.
   * @param listener The callback function to call with the loaded config on file changes.
   */
  listenOnFileChanged(listener: (config: LoadedConfig) => void) {
    // Set the listener callback
    this._onFileChanged = listener;

    // If no watcher exists, create one to monitor the file for changes
    if (this.watcher) return;
    this.watcher = watch(this.configFile, async (event, filename) => {
      // Only react to 'change' events to avoid unnecessary reloads
      if (event === "change" && filename) {
        try {
          // Reload the configuration from the file
          const config = await loadConfigFile(this.configFile);
          const log = `Reloaded the config file '${relative(process.cwd(), this.configFile)}'`;
          console.log(`${COLORS_ALL.GREEN_DARK}${log}${COLORS_ALL.RESET}`);
          // Invoke the listener if it exists
          this._onFileChanged?.(config);
        } catch (error) {
          // noop
        }
      }
    });
  }

  close() {
    if (!this.watcher) return;
    this.watcher.close();
    this.watcher = undefined;
  }
}
