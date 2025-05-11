import router from "../router";

const setupRouterGuard = () => {
    router.onError(err => {
        console.error('Vue-Router error:', err)
    })
    router.beforeEach((to, from, next) => {

    })
}
export default setupRouterGuard;
