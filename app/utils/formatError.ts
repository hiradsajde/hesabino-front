export function formatError(errors: string[] = [""]) {
    if(errors.length === 0) {
        return
    }
    const replaces = {
        "Required": "تکمیل این فیلد اجباری است ",
    }
    errors = Object.entries(replaces).reduce((acc , [key , value]) => {
        return errors.map((error: string) => error.replace(key , value))
    }, errors)
    console.log(errors) 
    return errors
}