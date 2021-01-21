const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require('./data')

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res){
    const about = {
        avatar_url: "https://avatars1.githubusercontent.com/u/55398495?s=400&u=d0a3891493387ab13270b4bfb0832097a7cdd93d&v=4",
        name: "Espezzialy Souza",
        role: "Intern - CI&T",
        description: "Programador focado em mobile, alinhado em aprender novas práticas",
        links: [
            {name: "Github", url: "https://github.com/espezzialy/"},
            {name: "Twitter", url: "https://twitter.com/espezzialy/"},
            {name: "Linkedin", url: "https://www.linkedin.com/in/espezzialy/"}
        ]
    }


    return res.render("about", {about: about})
})

server.get("/portfolio", function(req, res){

    return res.render("portfolio", { items: videos })
})

server.get("/video", function(req, res) {
    const id = req.query.id

    const video = videos.find(function(video){
        return video.id == id
    })

    if (!video) {
        return res.send("Video not found!")
    }

    return res.render("video", { item: video })
})

server.listen(5000, function(){
    console.log("Server is Running!")
})