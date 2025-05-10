export const useMenuActiveStore = defineStore('menu_active', () => {
    const currently = ref<string>("/dashboard/home")
    const getCurrentlyMenu = () => {
        const res = localStorage.getItem("currently");
        if (res === null) return currently.value;
        else return res;
    }

    const restCurrently = () => {
        localStorage.removeItem("currently");
        currently.value = "/dashboard/home";
    }
    const logCurrently = () => {
        console.log(currently.value);
    }
    // watchEffect(() => {
    //     console.log("当前currently:", currently.value)
    // })

    function setCurrentlyMenu(value: string) {
        currently.value = value;
        localStorage.setItem("currently", currently.value);
    }

    return {currently, getCurrentlyMenu, setCurrentlyMenu, logCurrently,restCurrently}
})


