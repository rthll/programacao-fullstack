import session from 'express-session';

const sessionConfig = session({
  secret: 'sua-chave-secreta',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,      
    httpOnly: true,    
    sameSite: 'strict'
  }
});

export default sessionConfig;