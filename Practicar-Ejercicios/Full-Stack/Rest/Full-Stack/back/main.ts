import { RouterContext } from "https://deno.land/x/oak@v11.1.0/router.ts";
import { Application, Router  } from "https://deno.land/x/oak@v11.1.0/mod.ts"; 
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
import { MongoClient } from "https://deno.land/x/mongo@v0.31.1/mod.ts";


await config({ export: true, allowEmptyValues: true });

const client = new MongoClient();

await client.connect(
  `mongodb+srv://${Deno.env.get('MONGO_USR')}:${Deno.env.get('MONGO_PWD')}@${Deno.env.get('MONGO_URI')}/?authMechanism=SCRAM-SHA-1`,
);

const db = client.database(Deno.env.get('DB_NAME'));
console.info("Mongodb connected");

console.info(`MongoDB ${db.name} connected`);

const usersCollection = db.collection("Users");
const tablesCollection = db.collection("Tables");

type User = {
    username: string;
    password: string;
    table: Table;
};

type column = {
    name: string,
    type: string,
}

type Table = {
    username: string,
    columns: column[],
    rows: string[][]
}

// POST
type PostUsersContext = RouterContext<
"/addUser",
Record<string | number, string | undefined>,
Record<string, any>
>;

type GetLogInUsersContext = RouterContext<
"/LogInJSON",
Record<string | number, string | undefined>,
Record<string, any>
>;

type GetLogInUsersWithParametrosContext = RouterContext<
"/LogInParametros",
Record<string | number, string | undefined>,
Record<string, any>
>;


type SaveTableContext = RouterContext<
"/saveTable",
Record<string | number, string | undefined>,
Record<string, any>
>;


// DELETE

type DeleteUserContext = RouterContext<
"/deleteUserJSON",
Record<string | number, string | undefined>,
Record<string, any>
>;

type DeleteUserWithParametrosContext = RouterContext<
"/deleteUserParametros",
Record<string | number, string | undefined>,
Record<string, any>
>;

type DeleteElementsTableContext = RouterContext<
"/elementTable",
Record<string | number, string | undefined>,
Record<string, any>
>;

// GET

type LoadTableContext = RouterContext<
"/loadTable/:username",
{
    username: string;
} &
Record<string | number, string | undefined>,
Record<string, any>
>;

type GetUserContext = RouterContext<
"/getUser",
Record<string | number, string | undefined>,
Record<string, any>
>;

type GetUserWithUsernameContext = RouterContext<
"/getUser/:username",
{
    username: string;
} &
Record<string | number, string | undefined>,
Record<string, any>
>;


// PUT

type PutInformationUserContext = RouterContext<
"/updateInformationUserJSON",
Record<string | number, string | undefined>,
Record<string, any>
>;

type PutInformationUserWithUsernameContext = RouterContext<
"/updateInformationUser/:username",
{
    username: string;
} &
Record<string | number, string | undefined>,
Record<string, any>
>;







export const addUser = async(context: PostUsersContext) => {
    try {
        const result =  context.request.body({type: "json"}) 
        const value = await result.value;

        const comprobarUser = await usersCollection.findOne({ username: value.username });
        if (comprobarUser) {
            context.response.body = "El usuario ya existe" ;
            context.response.status = 400;
            return;
        }
        
        const user: Partial<User> = {
            username: value.username,
            password: value.password,
            table: value.table,
        };

        console.log(user)

        await usersCollection.insertOne(user);
        context.response.body = { user };
        context.response.status = 200;
    } catch (error) {
        console.log(error);
        context.response.status = 500;
    }
}

export const logIn = async(context: GetLogInUsersContext) => {
    try{
        const result =  context.request.body({type: "json"})
        const value = await result.value;
        
        const user = await usersCollection.findOne({ username: value.username, password: value.password });

        if(!user){
            context.response.body = "El usuario no existe";
            context.response.status = 400;
            return;
        }else{
            context.response.body = "El usuario existe";
            context.response.status = 200;
            return;
        }

    }catch(error){
        console.log(error);
        context.response.status = 500;
    }
}

export const saveTable = async(context: SaveTableContext) => {
    try {
        const result =  context.request.body({type: "json"})
        const value = await result.value;

        const table: Partial<Table> = {
            username: value.username,
            columns: value.columns.map((column: any) => { return { name: column.name, type: column.type } }),
            rows: value.rows.map((row: any) => { return row}),
        };

        const tablaExistente = await tablesCollection.findOne({ username: value.username });
        if(tablaExistente){
            await tablesCollection.updateOne({ username: value.username }, { $set: { columns: table.columns, rows: table.rows } });
            context.response.body = { table };
            context.response.status = 200;
            return;
        }

        await tablesCollection.insertOne(table);
        context.response.body = { table };
        context.response.status = 200;

    } catch (error) {
        console.log(error);
        context.response.status = 500;
    }
}

export const loadTable = async(context: LoadTableContext) => {
    try {

        if(!context.params.username){
            context.response.body = "No hay usuario";
            context.response.status = 400;
            return;
        }

        const findTable = await tablesCollection.findOne({ username: context.params.username });

        if(!findTable){
            context.response.body = "No existe la tabla";
            context.response.status = 400;
            return;
        }else{
            context.response.body = findTable;
            context.response.status = 200;
            return;
        }
        
    } catch (error) {
        console.log(error);
        context.response.status = 500;
    }

}

const router = new Router();
router.post("/addUser", addUser);
router.post("/LogInJSON", logIn); // JSON
router.post("/LogInParametros", logIn);   
router.post("/saveTable", saveTable);

router.delete("/deleteUserJSON", );
router.delete("/deleteUserParametros", );
router.delete("/elementTable", );


router.get("/loadTable/:username", loadTable);
router.get("/getUser", )
router.get("getUser/:username", )

router.put("/updateInformationUserJSON", ) // Con JSON
router.put("/updateInformationUser/:username", )


const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8080 });
