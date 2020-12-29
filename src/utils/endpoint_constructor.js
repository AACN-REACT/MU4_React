



export class EndpointConstructor {



    constructor({origin, version=1, name}){

        this.origin=origin;
        this.version=version;
        this.name = name;
    }

    get mainListEndpoint () { return this.origin+"/"+"api"+"/"+"v"+this.version+"/"+this.name }
    fetchMainList(token){
        return fetch(this.mainListEndpoint, {headers:{"Authorization" : `Bearer ${token}`}})

    }




}