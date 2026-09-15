import { LocalDataProvider, RemoteDataProvider } from "./local-provider";
import { setDataProvider, getDataProvider } from "./data-provider";

const local = new LocalDataProvider();
const remote = new RemoteDataProvider(local);
setDataProvider(local);

export function useLocalFirst(online = false) {
  setDataProvider(online ? remote : local);
  return getDataProvider();
}

export { getDataProvider, local, remote };
