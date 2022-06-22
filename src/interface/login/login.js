//#region CAPTCHA
let captchaResponse = 'none'
function onloadCallback(){
     grecaptcha.render(document.getElementById('login-captcha'), {
      'sitekey' : '6Lf584YgAAAAAJXyfsrikOg3nMq0pDvV81Wpckj4',
      'callback' : submitCaptcha,
      'expired-callback' : expireCaptcha,
      'error-callback' : expireCaptcha,
      'theme' : 'light'
    })
}
function submitCaptcha(response) {
    captchaResponse = response
}
function expireCaptcha() {
    grecaptcha.reset()
    captchaResponse = 'none'
}
//#endregion CAPTCHA

//#region FACEBOOK LOGIN
function fbLoginHandler(res) {
    console.log(res)
    if(res.status === 'connected'){
        console.log('zalogowano')
        login(1, res.authResponse)
    }
    return false
}
window.onload = ()=>{
    window.fbAsyncInit = function() {
        FB.init({
            appId      : '3201016870185750',
            cookie     : true,
            xfbml      : true,
            version    : 'v14.0'
        })
        FB.AppEvents.logPageView()   
    }
    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return}
        js = d.createElement(s); js.id = id
        js.src = 'https://connect.facebook.net/en_US/sdk.js'
        fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))
}
document.getElementById('fbLogin').addEventListener('click',(e)=>{
    e.preventDefault()
    FB.getLoginStatus(function(response) {
        if(!fbLoginHandler(response)){
            FB.login(fbLoginHandler)
        }
        
    })    
})
//#endregion FACEBOOK LOGIN

//#region LOGIN METHOD
function login(mode = 0, params) {
    let payload;
    switch (mode) {
        case 0://regular
            if(captchaResponse !== 'none'){
                payload = {
                    method: 'password',
                    credentials: {
                        email: document.getElementById('loginEmail'),
                        password: document.getElementById('loginPassword')
                    },
                    captchaResponse: captchaResponse
                }
                break
            }
            console.log("CAPTCHA NOT SUBMITTED")
            break
        case 1://facebook
            payload = {
                method: 'facebook',
                facebookAuthResponse: params
            }
            break
        case 2://google
            payload = {
                method: 'google',
                googleAuthResponse: params
            }
            break
    }
    $.post( '/api/v1/1login', payload).done((data)=>{
        expireCaptcha()
        console.log(data)
        data = JSON.parse(data)
        switch (data['status']) {
            case 'success':
                window.location.href = '/panel'
                break
            case 'captcha error':
                console.log("CAPTCHA ERROR")
                break
            case 'login error':
                console.log("LOGIN ERROR")
                break
            case 'facebook error':
                console.log("FACEBOOK ERROR")
                break 
            case 'google error':
                console.log("GOOGLE ERROR")
                break          
            default:
                break
        }
    }).fail(()=>{
        console.log("SERVER ERROR TRY LATER")
    })
}
//#endregion LOGIN METHOD

//handle login button clicks
document.getElementById('loginButton').addEventListener('click', login)
