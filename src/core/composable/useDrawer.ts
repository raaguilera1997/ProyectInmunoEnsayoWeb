import { drawer as drawer_store } from "src/stores/drawer/drawer";

export const useDrawer = () => {
    const { drawer, setDrawer } = drawer_store();

    return {
        drawer,
        setDrawer
    }

}
