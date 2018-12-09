const mongoose = require('mongoose')

let ChallengeSchema = new mongoose.Schema (
    {
        title: String,
        description: String,
        img: String,
        videoUrl: String,
        votes: Number,
        views: Number,
        tags: String[]
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        comments: [
            {
                author: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                },
                text: String
            }
        ]
    }
);

ChallengeSchema.methods.updateVotes = function(vote) {
    this.votes = this.votes + vote
    return this.save()
}
ChallengeSchema.methods.views = function() {
    this.views++
    return this.save()
}
ChallengeSchema.methods.comment = function(c) {
    this.comments.push(c)
    return this.save()
}
ChallengeSchema.methods.addCreator = function (creatorId) {
    this.creator = creatorId
    return this.save()
}
// ChallengeSchema.methods.getUserArticle = function (_id) {
//     Article.find({'author': _id}).then((article) => {
//         return article
//     })
// }

module.exports = mongoose.model('Challenge', ChallengeSchema)
