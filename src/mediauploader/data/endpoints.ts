

export let endpoints ={

    apiOrigin:"https://localhost:44340/api/v1/"

}

class Endpoint {

    path;
    version;
    origin;

    constructor(origin, version, name){
        this.origin = origin;
        this.version = version;
        this.name = name
    }

    async returnGlobalList(token:string){

       let list;
       let error; 
       fetch(origin+`/v${this.version}`+`/name`, {headers: {'Authorization': `Bearer ${token}` }})
       .then(res=>res.json)
    }

}