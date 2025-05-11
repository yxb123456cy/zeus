import type {Employee} from "../types/company.ts";

export const useUserStateStore = defineStore('UserStateStore', () => {
    const isLogin = ref<boolean>(false); //默认是没有登录的;
    const currentUser = ref<Employee | null>(null);
    const getCurrentUser = computed(() => currentUser)

    //清空相关State;


    function setLoginState(value: boolean) {
        isLogin.value = value;
    }

    function restUserState() {
        isLogin.value = false;
        currentUser.value = null;
    }


    return {isLogin, currentUser, getCurrentUser, setLoginState,restUserState}

})