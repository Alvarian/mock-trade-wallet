module.exports = function (cookies, res) {
    Object.keys(cookies).forEach((cookie) => res.clearCookie(cookie));
}