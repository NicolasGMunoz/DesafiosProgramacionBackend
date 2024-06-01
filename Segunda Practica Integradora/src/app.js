import express  from "express"
import handlebars from "express-handlebars"
import mongoose from "mongoose"
import { __dirname } from "./util.js"
import CoursesRouter from './routes/courses.routes.js'
import StudentsRouter from './routes/students.routes.js'
import UsersRouter from './routes/users.routes.js'
import ViewsRouter from './routes/views.router.js'
import { initializePassport } from "./config/passport.config.js";
import passport from "passport"


const app = express();

const coursesRouter = new CoursesRouter()
const studentsRouter = new StudentsRouter()
const usersRouter = new UsersRouter()
const viewsRouter = new ViewsRouter()

initializePassport()
app.use(passport.initialize());

app.disable('x-powered-by')
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json())
app.use(express.urlencoded({ extended : true }))



app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use("/", viewsRouter.getRouter())
app.use("/api/courses", coursesRouter.getRouter())
app.use("/api/students", studentsRouter.getRouter())
app.use("/api/users", usersRouter.getRouter())


try {
    await mongoose.connect('mongodb+srv://nicolasgustavomunoz:5Dy8lacZIEoLyUE7@backend55660.ynxdryf.mongodb.net/?retryWrites=true&w=majority');
    console.log("Data Base connected");
    console.log(personas);
} catch (error) {
    console.log(error.message);
};


app.listen(8080, () => console.log("Server Running On Port 8080"))