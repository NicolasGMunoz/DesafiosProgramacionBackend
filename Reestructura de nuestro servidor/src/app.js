import path from "node:path";
import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import { __dirname } from "./utils.js";
import configs from "./config.js";
import { initializePassport } from "./config/passport.config.js";
import passport from "passport";


// import SessionsRouter from "./routes/sessions.routes.js";
// import ProductsRouter from "./routes/products.routes.js";
// import CartsRouter from "./routes/carts.routes.js";
// import ViewsRouter from "./routes/views.routes.js";


const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
	session({
		store: MongoStore.create({
			client: mongoose.connection.getClient(),
			ttl: 3600
		}),
		secret: "Coder55660secret",
		resave: true,
		saveUninitialized: true
	})
);

try {
	await mongoose.connect(configs.mongoUrl)
	console.log("Database connected")
} catch (error) {
	console.log(error.message)
	mongoose.disconnect()
}

app.engine(".hbs", handlebars.engine({ extname: ".hbs" }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", ".hbs");

app.disable('X-Powered-By')
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
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

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res) => {
	res.status(404).send({ status: "error", message: "404 not found" })
});

const server = app.listen(PORT, () => {
	console.log(`Server is ready on http://localhost:${PORT}`);
});




