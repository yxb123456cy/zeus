import router from "../router";

const setupRouterGuard = () => {
    router.onError(err => {
        console.error('Vue-Router error:', err)
    })

}
export default setupRouterGuard;
