import { Router } from "express";
const router=Router();
import studentAPiHandler from "./src/controllers/manageStudents/apiHandler.js"
const routes = (app)=> {
app.use("/api/student",studentAPiHandler);

}
export default routes;