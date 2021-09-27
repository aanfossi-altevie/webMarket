using app.interactions from '../db/interactions';

service CatalogService /*@(requires:'authenticated-user')*/{
    @cds.redirection.target : true
    entity Interactions_Header as

    projection on interactions.Interactions_Header;
    

    entity Interactions_Items

    as projection on interactions.Interactions_Items; 

}

/* service functionHeader {
     entity test
    as select from interactions.Interactions_Header {max(ID) as maxId};
} */
