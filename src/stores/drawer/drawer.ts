import { defineStore } from 'pinia';
export interface DrawerStateInterface {
    drawer: boolean
}
export const drawer = defineStore('drawer', {
    state: (): DrawerStateInterface => {
        return {
            drawer: false
        };
    },
    getters: {
        GetDrawer(state) {
            return state.drawer;
        },
    },

    actions: {
        setDrawer() {
            this.drawer = !this.drawer
        }
    },
    persist: {
        storage: localStorage,
        paths: ['drawer'],
    },
})
