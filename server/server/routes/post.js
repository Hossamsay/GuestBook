const postcontroller = require('../controllers/PostController.js')  // this is require our newly created UserController

module.exports = (router) => {

    /**
     * get a user
     */
    router
        .route('/post/:id')  
        .get(postcontroller.getPost)

    /**
     * adds a Post
     */
    router
        .route('/post') 
        .post(postcontroller.addPost)

    router
        .route('/posttag') 
        .post(postcontroller.savePostAndTagAsync)


	router
        .route('/posts/')  
        .get(postcontroller.getAllPost)    

    router
        .route('/removepost')
        .post(postcontroller.removepost)

    router
        .route('/savecomment')
        .post(postcontroller.savecomment)
}