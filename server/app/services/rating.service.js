import { User } from '../models/user.model.js';
import { UserTag } from '../models/user-tag.model.js';
import { View } from '../models/view.model.js';
import { Likes } from '../models/likes.model.js';
import { Block } from '../models/block.model.js';

export default class RatingService {
    // Compute the rating of a user
    // Profile completion = ((userTags / 5) * 20 + (bio != null) * 30 + (imgA != null) * 10 + (imgB != null) * 10 + (imgC != null) * 10 + (imgD != null) * 10 + (imgE != null) * 10)
    // rating = ((receivedLikes / issuedLikes) * 30 + (receivedLikes / receivedViews) * 30 + profileCompletion * 40) * (100 - receivedBlocks / receivedViews * 100)
    static async computeUserRating(login) {
        const user = await User.getUserByLogin(login);
        const userTags = await UserTag.getUserTagsByLogin(login);
        const receivedLikes = await Likes.getReceivedLikes(login);
        const issuedLikes = await Likes.getIssuedLikes(login);
        const receivedViews = await View.getReceivedViews(login);
        const receivedBlocks = await Block.getReceivedBlocks(login);
        const profileCompletion = ((userTags.length / 5) * 20 + (user.bio !== null) * 30 + (user.imgA !== null) * 10 + (user.imgB !== null) * 10 + (user.imgC !== null) * 10 + (user.imgD !== null) * 10 + (user.imgE !== null) * 10);

        let rating = 0;
        if (issuedLikes !== null) {
            rating += (receivedLikes.length / issuedLikes.length) * 30;
        } else {
            rating += 30;
        }
        if (receivedViews !== null) {
            rating += (receivedLikes.length / receivedViews.length) * 20;
        } else {
            rating += 20;
        }
        rating += profileCompletion * 40;
        if (receivedViews !== null) {
            rating *= (receivedBlocks.length / receivedViews.length);
        }
        return rating;
    }
}