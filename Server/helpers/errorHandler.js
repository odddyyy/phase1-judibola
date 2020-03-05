module.exports = (err, req, res, next) => {
    if (err.name == `SequelizeValidationError`){
        let error = []
        err.errors.forEach(i => {
            error.push(i.message)
        })
        res.status(400).json(error)
    }

    if (err.status == 404) {
        res.status(404).json(err)
    } else if (err.status == 400) {
        res.status(400).json(err)
    } else if (err.status == 401) {
        res.status(401).json(err)
    } else {
        res.status(500).json(`Server Error!`)
    }

}