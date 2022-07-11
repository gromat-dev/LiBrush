import passportCustom from 'passport-custom'
import getFacebookID from '../../modules/login/getFacebookID.js'
import bcrypt from 'bcrypt'
const CustomStrategy = passportCustom.Strategy

export default function initializePassport(passport) {
    passport.use(new CustomStrategy((req, done)=>{
        console.log('dupa')
        console.log(req.body)
        switch (req.body.method) {
            case 'facebook':
                getFacebookID(req.body.facebookAuthResponse.accessToken).then((id) => {
                    console.log(id)        
                    //findUserByFbId           
                    done(null, 1)
                }).catch(() => {
                    done(null, false, { message: 'Facebook error' })
                })
                break
            case 'google':
                done(null, 1)
                break
            case 'password':
                //findUserByUserName
                //ifExists check password
                //if password is fine
                done(null, 1)
                break
            default:
                done(null, false, { message: 'Login error' })
                break
        }
        done(null, 1)
    }))
    passport.serializeUser((user, done) => done(null, user))
    passport.deserializeUser((id, done) => {
      return done(null, id)
    })
}