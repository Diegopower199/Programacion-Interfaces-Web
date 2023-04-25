import { serve } from "std/http/server.ts";
import { MongoClient, ObjectId } from 'npm:mongodb@5'


// connect to mongo
const uri = 'mongodb://mongo:27017';
console.log("HOLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
const client = new MongoClient(uri);

// Database Name
const dbName = 'Agenda';

// Use connect method to connect to the server
//await client.connect();
await client.connect;
console.log('Connected successfully to Mongo server');
const db = client.db(dbName);
const UsersCollection = db.collection("Users");
const TablaInformacionCollection = db.collection("Tabla_Informacion");




async function handler(req: Request): Promise<Response> {
  console.log("new request")
  const url = new URL(req.url);
  console.log("Method:", req.method);
  switch (req.method) {
    case "OPTIONS": {
      return new Response("ok", {status: 200});
    }
    case "GET": {
      switch (url.pathname) {
        case "/contacts": {
          console.log("contacts");
          const contacts = await UsersCollection.find().toArray();
          return new Response(JSON.stringify({ contacts }), {
            headers: { "content-type": "application/json; charset=utf-8" },
          });
        }
        case "/users": {
          console.log("users");
          const users = await UsersCollection.find().toArray();
          return new Response(JSON.stringify({ users }), {
            headers: { "content-type": "application/json; charset=utf-8" },
          });
        }
          case "/getUser": {
                 
              console.log("Estoy dentro de get usuario");
              
              try {
                let params = new URLSearchParams(url.search);
                var nombreUsuario = params.get('nombreUsuario');
                var contrasena = params.get('contrasena');
                console.log("Valor nombre usuario: ", nombreUsuario, "\nValor password: ", contrasena)
  
                const comprobarUser = await UsersCollection.findOne({nombreUsuario: nombreUsuario, contrasena: contrasena});
                console.log("Comprobar usuario", comprobarUser)
                if (comprobarUser) {
                  //return new Response("El usuario es correcto", { status: 200 })
                  return new Response(JSON.stringify({ comprobarUser }), {
                    headers: { "content-type": "application/json; charset=utf-8" },
                  });
                }
                else {
                  return new Response("El usuario y contraseña son incorrectos", { status: 200 });
                }
                
              } catch (e) {
                return new Response(e, { status: 500 });
              }
            
          }
          case "/getInformacionTablaUser": {
            console.log("Estoy dentro de get informacion tabla");
              
              try {
                let params = new URLSearchParams(url.search);
                var nombreUsuario = params.get('nombreUsuario')
                console.log("Valor nombre usuario: ", nombreUsuario );
  
                const informacionTabla = await TablaInformacionCollection.find({nombreUsuario: nombreUsuario}).toArray();
                console.log("Comprobar tabla informacion", informacionTabla)
                if (informacionTabla) {
                  //return new Response("El usuario es correcto", { status: 200 })
                  return new Response(JSON.stringify({ informacionTabla }), {
                    headers: { "content-type": "application/json; charset=utf-8" },
                  });
                }
                else {
                  return new Response("El usuario y contraseña son incorrectos", { status: 200 });
                }
                
              } catch (e) {
                return new Response(e, { status: 500 });
              }

          }
        default:
          return new Response("Invalid route", { status: 404 });
      }
    }
    case "DELETE": {
      switch (url.pathname) {
        case "/deleteUser": {
          console.log("Estoy en delete para borrar un usuario");
          let params = new URLSearchParams(url.search);
          var idUsuario = params.get('idUsuario');
          
          console.log("Valor ID usuario: ", idUsuario);

            try {
              await UsersCollection.deleteOne({ _id: new ObjectId(idUsuario) });
              return new Response("OK", { status: 200 });
            } catch (e) {
              return new Response(e, { status: 500 });
            }
        }
          case "/deleteInformacionTabla": {
            if (req.body) {
              console.log("Estoy dentro de eliminar informacion tabla");
              const body = await req.json();
              console.log("Body:", body);
              try {
                const {filas, nombreUsuario} = body;
                console.log("Fila: ", filas ,"  Nombre usuario: ", nombreUsuario);

                const encontrarInformacionTabla = await TablaInformacionCollection.findOne({ filas: filas, nombreUsuario: nombreUsuario });
                console.log(encontrarInformacionTabla)

                const informacion = await TablaInformacionCollection.deleteOne({ _id: new ObjectId(encontrarInformacionTabla._id) });
                return new Response(JSON.stringify({filas: filas, nombreUsuario: nombreUsuario, _id: informacion.insertedId}), { status: 200 });
                
              } catch (e) {
                return new Response(e, { status: 500 });
              }
            } else {
              return new Response("Invalid data", { status: 403 });
            }
          }
        default:
          return new Response("Invalid route", { status: 404 });
      }
    }

    case "POST": {
      switch (url.pathname) {
        case "/addUser": {
          if (req.body) {
            console.log("Estoy dentro de añadir usuario");
            const body = await req.json();
            console.log("Body:", body);
            try {
              const {nombreUsuario, email, contrasena} = body;
              console.log("Nombre: ", nombreUsuario, "\nEmail: ", email, "\nContraseña: ", contrasena);

              const comprobarUser: boolean = await UsersCollection.findOne({nombreUsuario: nombreUsuario});
              console.log("Comprobar usuario", comprobarUser)
              if (comprobarUser) {
                return new Response("El usuario ya existe", { status: 200 })
              }
              const user = await UsersCollection.insertOne({ nombreUsuario, email, contrasena });
              return new Response(JSON.stringify({nombreUsuario, email, contrasena, id: user.insertedId}), { status: 200 });
              
            } catch (e) {
              return new Response(e, { status: 500 });
            }
          } else {
            return new Response("Invalid data", { status: 403 });
          }
        }
        case "/addContact": {
          if (req.body) {
            console.log("ESTOY DENTRO DEL POST AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
            const body = await req.json();
            console.log("Body:", body);
            try {
              const {name, phone} = body;
              if (name === "Diego") {
                console.log("HOla a Diego")
              }
              const user = await UsersCollection.insertOne({ name, phone });
              return new Response(JSON.stringify({name, phone, id: user.insertedId}), { status: 200 });
            } catch (e) {
              return new Response(e, { status: 500 });
            }
          } else {
            return new Response("Invalid data", { status: 403 });
          }
        }
        
        case "/addInformacion": {
          console.log("ESTOY DENTRO DEL POST de añadir informacion de la tabla")
          if (req.body) {
            console.log("ESTOY DENTRO DEL POST de añadir informacion de la tabla")
            const body = await req.json();
            console.log("Body:", body);
            try {
              const {filas, columnas, nombreUsuario} = body;

              const tablaUsuario = await TablaInformacionCollection.insertOne({ filas, columnas, nombreUsuario});
              return new Response(JSON.stringify({filas, columnas, nombreUsuario, id: tablaUsuario.insertedId}), { status: 200 });
            } catch (e) {
              return new Response(e, { status: 500 });
            }
          } else {
            return new Response("Invalid data", { status: 403 });
          }
        }
        default:
          return new Response("Invalid route", { status: 404 });
      }
    }
    default:
      return new Response("Invalid method", { status: 405 });
  }
}




// serve on port 8080
console.log("Ready to accept connections on port 8080");
serve(handler, { port: 8080 });