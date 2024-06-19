import { createPinia } from "pinia";
const pinia = createPinia();

import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
pinia.use(piniaPluginPersistedstate);

export * from "./modules/setConfig";
export * from "./modules/user";

export default pinia;
