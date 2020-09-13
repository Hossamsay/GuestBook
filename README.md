## App scenario

1-it will start with home page which contain all posts and replies but i can't make reply or post till i login.
2-i will make register and after it i will make login 
3-user posts nav will appear upper when i log in to go to my all post 
4-i can make post with title and message 
5-i can make all crud methods 
6-and there is reply button i can make reply to any post in home app or in my posts and the name of author will diplay 
7-when i finished all my elements i can make logout in the upper right button

----------------------------------------------------------------------------------------------------                 
## steps(backend)

1-configure my database engine (mongodb) and setup my backend environmet (node.js)
2-put my mongodb url database in my app.js
3-i start with server file in node.js by creating model and controller folders model for database and controller for methods and actions and that called MVC design structure 
4-after making model and it's controller i created routes folder for routing every page in my app according to my design 
5-after all routes i shared it all in my main file app.js by using all routes after /api
6- finally i made JWTAuth to authroize the user login 
i used MVC structure because i worked with it alot especially in ASp.net and it is very easy to read and edit
-----------------------------------------------------------------------------------------------------
## steps(frontend)
1-after making my backend app i start to setup and create my react app with it's scripts
2-in src file i start to make folder for views 
3-make view for every page in my views folder 
4-use it in my main file  index.js by importng them and use them in reactDom.render()
5- i used Redux for state management. To summarize it
6-make axioconfig file for configration the backend node.js
