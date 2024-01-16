import ShellyProvider from "./ShellyProvider";
import { ShellyConfig as Config } from "./ShellyProvider";
import { useShellyContext } from "./hooks";
export type ShellyConfig = Config;

export {useShellyContext};
export default ShellyProvider;