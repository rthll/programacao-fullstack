import session from "express-session";

export default session({
  secret: "super_seguro",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 30 // 30 minutos
  }
});
