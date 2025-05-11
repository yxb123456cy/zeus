export const useRestPasswordStore = defineStore('rest_password_dialog', () => {
    const show = ref<boolean>(false)
    const getShow = computed(() => show)

    function setShow(value: boolean) {
        show.value = value;
    }
    return {show, getShow, setShow}
},{
    persist:true,
})