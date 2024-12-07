import { createServer } from "http"
import { configDotenv } from "dotenv";
import app from "./app";
configDotenv()


let server = createServer(app);
const PORT = process.env.PORT || 8080;



server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})