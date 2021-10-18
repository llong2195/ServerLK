const comment = async (req, res)=>{
    const id = req.params.id;
    
    await new CommentModel(comment).save();

    res.redirect(req.path);
}

module.exports = {
    comment
}