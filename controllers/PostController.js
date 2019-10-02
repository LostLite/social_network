module.exports = {
    getPosts: (req, res) => {
        res.json({
            posts: [
                {title: 'This is the First Post'},
                {title: 'This is the Second Post'},
                {title: 'This is the Third Post'}
            ]
        })
    }
}