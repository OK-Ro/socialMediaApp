import mongoose from "mongoose";
import Verification from "../models/emailVerification.js";
import User from "../models/userModel.js";
import { compareString } from "../utils/index.js";

export const verifyEmail = async (req, res) => {
    const { userId, token } = req.params;

    try {
        const results = await Verification.findOne({ userId });

        if (results) {
            const { expiresAt, hashedToken } = results;

            if (expiresAt < Date.now()) {
                await Verification.findOneAndDelete({ userId });
                await User.findOneAndDelete({ _id: userId });
                const message = "Verification token has expired.";
                return res.redirect(`/users/verified?status=error&message=${message}`);
            } else {
                compareString(token, hashedToken)
                    .then((isMatch) => {
                        if (isMatch) {
                            User.findOneAndUpdate({ _id: userId }, { verified: true })
                                .then(() => {
                                    Verification.findOneAndDelete({ userId }).then(() => {
                                        const message = "Email verification successful!";
                                        res.redirect(`/users/verified?status=success&message=${message}`);
                                    });
                                })
                                .catch((err) => {
                                    console.log(err);
                                    res.redirect(`/users/verified?message=`);
                                });
                        } else {
                            const message = "Invalid verification token.";
                            res.redirect(`/users/verified?status=error&message=${message}`);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        res.redirect(`/users/verified?message=`);
                    });
            } 
        } else {
            // Handle the case of an invalid verification link here
            const message = "Invalid verification link. Please try again later.";
            res.redirect(`/users/verified?status=error&message=${message}`);
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};
