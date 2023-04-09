import { Request, Response } from "express";
import Users from "../models/userModel";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { generateAccessToken, generateActiveToken, generateRefreshToken } from "../config/generateToken";
import sendEmail from "../config/sendEmail";
import { validEmail, validPhone } from "../middleware/valid";
import { sendSms } from "../config/sendSMS";
import { IDecodedToken, IUser } from "../config/interface";

const authController = {
    register: async (req: Request, res: Response) => {
        try {
            const { name, account, password } = req.body

            const user = await Users.findOne({ account })
            if (user) return res.status(400).json({ msg: 'Email or phone number already exists' })

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = { name, account, password: passwordHash }

            const active_token = generateActiveToken({ newUser })
            const url = `${process.env.BASE_URL}/active/${active_token}`

            if (validEmail(account)) {
                sendEmail(account, url, 'Verify your email address')
                return res.status(200).json({ msg: "Success! Please check your mail." })
            } else if (validPhone(account)) {
                sendSms(account, url, 'Verify your phone number')
                return res.status(200).json({ msg: "Success! Please check phone." })
            }
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }

    },
    activeAccount: async (req: Request, res: Response) => {
        try {
            const { active_token } = req.body

            const decoded = <IDecodedToken>jwt.verify(active_token, `${process.env.ACTIVE_TOKEN_SECRET}`)

            const { newUser } = decoded

            if (!newUser) return res.status(400).json({ msg: 'Invalid authentication' })
            const user = new Users(newUser)

            await user.save()
            res.status(200).json({ msg: 'Account has been activated' })

        } catch (error: any) {
            console.log(error);
            let errMsg;
            if (error.code === 11000) {
                errMsg = Object.keys(error.keyValue)[0] + " already exists"
            }
            return res.status(500).json({ msg: errMsg })
        }
    },
    login: async (req: Request, res: Response) => {
        console.log('in loginn');
        
        try {
            const { account, password } = req.body

            const user = await Users.findOne({ account })
            if (!user) return res.status(400).json({ msg: 'This user does not exists.' })

            loginUser(user, password, res)

        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },
    logout: async (req: Request, res: Response) => {
        try {
            res.clearCookie('refreshtoken', { path: `/api/refresh_token` })
            return res.json({ msg: 'Logged out!' })
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },
    refreshToken: async (req: Request, res: Response) => {
        try {
            const rf_token = req.cookies.refreshtoken
            if (!rf_token) return res.status(400).json({ msg: 'Please login now!' })

            const decoded = <IDecodedToken>jwt.verify(rf_token, `${process.env.REFRESH_TOKEN_SECRET}`)
            if (!decoded) return res.status(400).json({ msg: 'Please login now!' })

            const user = await Users.findById(decoded.id).select("-password")
            if (!user) return res.status(400).json({ msg: 'This account does not exist.' })

            const access_token = generateAccessToken({id:user._id})

            res.json({ access_token})

        } catch (err: any) {
            console.log('error');

            return res.status(500).json({ msg: err.message })
        }
    }
}

const loginUser = async (user: IUser, password: string, res: Response) => {
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ msg: 'Password is incorrect.' })

    const access_token = generateAccessToken({ id: user._id })
    const refresh_token = generateRefreshToken({ id: user._id })

    res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: `/api/refresh_token`,
        maxAge: 30 * 24 * 60 * 60 * 1000
    })

    res.json({
        msg: 'Login Success!',
        access_token,
        user: { ...user._doc, password: '' }
    })
}

export default authController;