import express  from "express"
import handlebars from "express-handlebars"
import mongoose from "mongoose"
import { __dirname } from "./util.js"
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import session from "express-session"
import MongoStore from "connect-mongo"
import sessionsRouter from './routes/sessions.router.js';
import passport from "passport"


const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use(
	session({
		store: MongoStore.create({
			client: mongoose.connection.getClient(),
			ttl: 3600
		}),
		secret: "Coder55575secret",
		resave: true,
		saveUninitialized: true
	})
);

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use("/api/sessions", sessionsRouter)


try {
    await mongoose.connect('mongodb+srv://nicolasgustavomunoz:5Dy8lacZIEoLyUE7@backend55660.ynxdryf.mongodb.net/?retryWrites=true&w=majority');
    console.log("Data Base connected");
    console.log(personas);
} catch (error) {
    console.log(error.message);
};


app.listen(8080, () => console.log("Server Running On Port 8080"))