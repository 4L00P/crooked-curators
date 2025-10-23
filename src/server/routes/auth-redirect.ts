import passport from 'passport';
import { Router } from 'express';

// authRouter is /auth/google
const authRouter = Router();

authRouter.get('/',
  passport.authenticate('google', { scope: ['email', 'profile'] }),
  (req, res)=>{
    // console.log('user attempting login', req.body.user);
  });

authRouter.get('/callback',
  passport.authenticate('google', {
    failureRedirect: '/'
  }),
  (req, res) => {
    res.redirect('/');
  });

authRouter.get('/logout', (req, res, next) =>{
  req.logout(function(err){
    if(err){
      return next(err)
    }
    res.redirect('/')
  })
}
)

// use this to make user context on frontend as well
authRouter.get('/user', (req, res)=>{
  res.send(req.user)
})


export { authRouter };
