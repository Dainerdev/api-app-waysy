import app from "./app";

const main=() =>{
    app.listen(app.get("port"));
    console.log(`Server running on port: http://localhost:${app.get("port")}`);
};

main();