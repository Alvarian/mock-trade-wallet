/*
    import router
    import lib
    import models
    use Token
    use User
*/


// post / if login works using body details with password and user from db, cache (new refresh token)() and send (new access token)(). If not send status unauthorized

// post if user does not exist hash password and assign to username in db. After, send status okay

// delete if user and password match db, clear redis refresh token for user and send status okay

// expose 