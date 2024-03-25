import passport from "passport";
import GitHubStrategy from "passport-github2"
import usersModel from "../dao/dbManager/models/user.model.js";
import local from "passport-local"
import { createHash , isValidPassword } from '../util.js'

const LocalStrategy = local.Strategy;

export const initializePassport = () => {
	passport.use(
		"github",
		new GitHubStrategy(
			{
				clientID: " Iv1.88453ce422325db5",
				clientSecret: "23f7e31d190791510bc97f7643c9b84b468dc34d",
				callbackURL: "http://localhost:8080/api/sessions/github-callback",
				scope: ["user:email"]
			},
			async (accessToken, refreshToken, profile, done) => {
				try {
					const email = profile.emails[0].value;
					const user = await usersModel.findOne({ email });
					
					if (!user) {
						const newUser = {
							first_name: profile._json.name,
							last_name: "",
							age: 18,
							email,
							password: "",
							role: "user"
						};
						const result = await usersModel.create(newUser);
						return done(null, result);
					} else {
						return done(null, user);
					}
				} catch (error) {
					console.log(error);
					return done("Incorrect credentials");
				}
			}
		)
	);


	passport.use(
		"register",
		new LocalStrategy(
			{
				passReqToCallback: true, 
				usernameField: "email"
			},
			async (req, username, password, done) => {
				try {
					const { first_name, last_name, age } = req.body;

					const user = await usersModel.findOne({ email: username });
					if (user) {
						return done(null, false);
					}
					const hashedPassword = createHash(password);
					const userToSave = {
						first_name,
						last_name,
						email: username,
						age,
						password: hashedPassword,
						role: "user"
					};
					const result = await usersModel.create(userToSave);
					return done(null, result); 
				} catch (error) {
					return done("Incorrect credentials");
				}
			}
		)
	);
	passport.use(
		"login",
		new LocalStrategy(
			{
				usernameField: "email"
			},
			async (username, password, done) => {
				try {
					if (
						username.trim() === "adminCoder@coder.com" &&
						password === "adminCod3r123"
					) {
						const user = {
              _id: 1,
							first_name: `Admin Coder`,
							email: username,
							role: "admin"
						};
						return done(null, user);
					}
					const user = await usersModel.findOne({ email: username });
					const validPassword = isValidPassword(password, user.password);

					if (!user || !validPassword) {
						return done(null, false);
					}
					return done(null, user);
				} catch (error) {
					return done("Incorrect credentials");
				}
			}
		)
	);

	passport.serializeUser((user, done) => {
		done(null, user._id);
	});
	passport.deserializeUser(async (id, done) => {
		if (id == 1)
			return done(null, { first_name: `Admin Coder`, email: "adminCoder@coder.com" , role: "admin" });
		const user = await usersModel.findById(id);
		done(null, user);
	});
};