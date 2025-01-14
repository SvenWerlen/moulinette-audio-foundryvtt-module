import { MODULE_ID, MODULE_MOULINETTE_ID, SETTINGS_SOUNDBOARDS } from "../constants";
import { AnyDict, MouModule } from "../types";

/**
 * This class server allow Moulinette Application to be independant from FVTT
 */
export default class MouApplication extends Application {
 
  static APP_NAME = "MouApplication";

  APP_NAME = "Moulinette Audio";        // default application name

  static logDebug(source: string, message: string, data?: any) {
    const module = MouApplication.getModule()
    if(module.debug) {
      if(data !== undefined) {
        console.debug(`${source} | ${message}`, data); 
      } else {
        console.debug(`${source} | ${message}`); 
      }
    }
  }

  static logInfo(source: string, message: string, data?: any) {
    if(data !== undefined) {
      console.log(`${source} | ${message}`, data); 
    } else {
      console.log(`${source} | ${message}`); 
    }
  }

  static logWarn(source: string, message: string, data?: any) {
    if(data !== undefined) {
      console.warn(`${source} | ${message}`, data); 
    } else {
      console.warn(`${source} | ${message}`); 
    }
  }

  static logError(source: string, message: string, data?: any, error?: any) {
    if(data !== undefined) {
      console.error(`${source} | ${message}`, data); 
    } else {
      console.error(`${source} | ${message}`); 
    }
    if(error) {
      console.error(error)
    }
  }

  logDebug(message: string, data?: any) { MouApplication.logDebug(this.APP_NAME, message, data) }
  logInfo(message: string, data?: any) { MouApplication.logInfo(this.APP_NAME, message, data) }
  logWarn(message: string, data?: any) { MouApplication.logWarn(this.APP_NAME, message, data) }
  logError(message: string, data?: any, error?: Error) { MouApplication.logError(this.APP_NAME, message, data, error) }

  static getModule(): MouModule {
    return (game as Game).modules.get(MODULE_ID) as MouModule;
  }

  static getMoulinetteModule(): any {
    return (game as Game).modules.get(MODULE_MOULINETTE_ID) as MouModule;
  }

  static async setSettings(key: string, value: unknown) : Promise<unknown> {
    MouApplication.logDebug(MouApplication.APP_NAME, `Storing data for settings ${key}`)
    return (game as Game).settings.set(MODULE_ID, key, value)  
  }

  static getSettings(key: string): unknown {
    return (game as Game).settings.get(MODULE_ID, key)
  }


  /**
   * Retrieves the soundboard settings for the current user.
   *
   * @returns {AnyDict} The soundboard settings for the current user. If no settings are found, returns an empty object.
   * @throws {Error} If the user ID is invalid or not found.
   */
  static getUserSoundboard(): AnyDict {
    const userId = (game as Game).user?.id
    if(!userId || userId.length == 0) {
      throw new Error("Invalid user")
    }
    return MouApplication.getSettings(SETTINGS_SOUNDBOARDS) as AnyDict
  }

  /**
   * Sets the user's soundboard settings.
   *
   * @param soundboard - An object representing the soundboard settings to be saved.
   * @returns A promise that resolves when the settings have been successfully saved.
   * @throws Will throw an error if the user ID is invalid or not found.
   */
  static async setUserSoundboard(soundboard: AnyDict): Promise<void> {
    const userId = (game as Game).user?.id
    if(!userId || userId.length == 0) {
      throw new Error("Invalid user")
    }
    await MouApplication.setSettings(SETTINGS_SOUNDBOARDS, soundboard)
  }
}