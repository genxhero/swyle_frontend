export const parseUrl = (string) => {
    switch (string) {
        case "Image":
            return '/images';
        case "Article":
            return '/articles';
        default:
            return '/articles';
    }
}

export const findMatch = (queryString, stringWeBeChecking) => {
    const queries = queryString.split(' ');
    for (let i=0; i < queries.length; i++) {
        if (stringWeBeChecking.match(queries[i])) {
            return true;
        }
    }
    return false;
}