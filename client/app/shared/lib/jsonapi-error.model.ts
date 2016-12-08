export class JsonApiError {
    errors: Object;

    constructor(jsonApiErrors: any) {
        this.errors = jsonApiErrors;
    }

    toString() {
        let string = ``;
        for (let [i, error] of Object.entries(this.errors)) {
            string += `${error.status} ${error.title} : ${error.detail} `;
        }
        return string;
    }
}