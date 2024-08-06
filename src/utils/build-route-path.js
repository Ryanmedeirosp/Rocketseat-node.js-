export function buildRoutePath(path){
    const routeRegex = /:([a-zA-Z]+)/g

    const pathParams = path.replaceAll(routeRegex, '(?<$1>[a-z0-9\-_]+)')

    const pathRegex = new RegExp(`^${pathParams}`)

    return pathRegex
}