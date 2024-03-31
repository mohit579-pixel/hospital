module.exports.isLoggedIn=(req,res,next)=>{
    console.log(req.user);
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
    // req.flash("error","You MUSt be LOGGED in to create listings");
    return res.redirect("/home");}
    next();
};

module.exports.isAuthorized=(req,res,next)=>{
    if(req.user.email!='mohitkhandelwal579@gmail.com')
    {
        return res.redirect('/home');
    }
    next();
};


module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        // console.log(req.session.redirectUrl)
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};