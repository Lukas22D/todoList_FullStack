const validateBody = async (req, res, next) => {
    const { body } = req.body;
    if (!body || body === '') {
        return res.status(400).json({ message: 'O campo "title" é obrigatório' })
    };
    
    if ( body ===  undefined) {
        return res.status(400).json({ message: 'O campo "title" deve ser uma string' })
    }
    next();
};

const validateUpdate = async (req, res, next) => {
    const { title, status } = req.body;
    if (title === '') {   
        return res.status(400).json({ message: 'O campo "title" é obrigatório' })
    };

    if (title ===  undefined) {
        return res.status(400).json({ message: 'O campo "title" deve ser uma string' })
    };

    if (status === '') {
        return res.status(400).json({ message: 'O campo "status" é obrigatório' })
    };

    if (status ===  undefined) {
        return res.status(400).json({ message: 'O campo "status" deve ser uma string' })
    };

    next();
};



module.exports = {
    validateBody,
    validateUpdate
};