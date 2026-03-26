function bootNavigation(mapLoaded) {
    try {
        console.log(`Is navigation loaded : ${mapLoaded}`)
        if (!mapLoaded) {
            throw new Error("Map was not paased in this function")
        }
        return "NAV_OK"

    } catch (error) {
        console.log(error)
        console.log(`'Navigation Failed': ${error.message}`)
    } finally {
        console.log(`Navigation Sequence completed`)
    }
}

const status1 = bootNavigation(false)
console.log("RESULT : ", status1)