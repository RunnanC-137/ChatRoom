require("dotenv").config()
const os = require("os")
const networkInfo = os.networkInterfaces();
console.log(networkInfo['Wi-Fi'][3].address) // ip

const get = (req, res) => {
    res.render("login.ejs")
} 
const login = (req, res) => {
    const { email, senha } = req.body
    fetch(`${process.env.API_URL}/login`, {
        method: "post",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({ email, senha})
    })
    .then(response => {
        switch (response.status) {
            case 200: {
                let token = response.headers.get("athorization-token")
                res
                    .cookie("token", token)
                    .redirect("/usuario")
            }
            
                
        }
    })
    .catch(err => {
        console.log(`Error: ${err}`)
        res.render("login.ejs", {error: true})
    })

}

module.exports = { login, get }