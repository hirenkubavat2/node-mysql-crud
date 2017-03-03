/**
 * Created by webwerks on 2/3/17.
 */

/*User registration form*/
exports.form=function (req,res) {

    res.render('add_user',{page_title:'User Registration',message:''});
};
exports.add=function (req,res) {
    console.log(req.body);
    if(req.body.fname !='' && req.body.email != '' && req.body.password!=''){
        req.getConnection(function (err,connection) {
            var data={
                email: req.body.email,
                password:req.body.password,
                active:1
            };
            var query=connection.query('insert into users set ?',data,function (err,rows) {
                if(err){
                    res.render('add_user',{page_title:'Error!',flash:{message:'All fields are required'}});
                }else{
                    req.session.sessionFlash = {
                        type: 'success',
                        message: 'This is a flash message using custom middleware and express-session.'
                    }
                    res.render('add_user',{page_title:'User Registration',message:'Record saved successfully!'});
                }
            });
        });
    }else{
        res.render('add_user',{page_title:'Error!',message:'All fields are required',flash:{message:'All fields are required'}});
    }

    /*req.checkBody(req.body.fname,'First name is required').notEmpty();
    var errors=req.validationErrors();
    if(errors){
        res.render('register',{flash:{error}});
    }else{

    }*/
}