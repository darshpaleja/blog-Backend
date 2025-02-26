var userModel = require('../model/UsersSchema')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
require('dotenv').config()
const axios = require('axios')
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: "darshbhatia007@gmail.com",
    pass: "cqnu ihrn qnsp cwlz",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendWelcomeEmail(userEmail, name) {
  try {
    const info = await transporter.sendMail({
      from: '"BlogVerse ✍️" <darshbhatia007@gmail.com>',
      to: userEmail,
      subject: `Welcome a board, ${name}! 🚀`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background-color: #f9fafb;
            }
            .header {
              background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
              color: white;
              padding: 40px 20px;
              text-align: center;
              border-radius: 16px;
              margin-bottom: 30px;
              box-shadow: 0 10px 20px rgba(99, 102, 241, 0.2);
            }
            .header h1 {
              margin: 0;
              font-size: 32px;
              letter-spacing: 1px;
            }
            .header p {
              margin: 10px 0 0;
              opacity: 0.9;
              font-size: 18px;
            }
            .content {
              background: white;
              padding: 30px;
              border-radius: 16px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
              margin-bottom: 30px;
            }
            .welcome-message {
              font-size: 24px;
              color: #374151;
              margin-bottom: 20px;
              border-bottom: 2px solid #e5e7eb;
              padding-bottom: 15px;
            }
            .feature-box {
              background: #f3f4f6;
              padding: 20px;
              border-radius: 12px;
              margin: 20px 0;
            }
            .feature-title {
              color: #6366f1;
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .feature-list {
              list-style: none;
              padding: 0;
              margin: 0;
            }
            .feature-list li {
              padding: 8px 0;
              padding-left: 24px;
              position: relative;
              color: #4b5563;
            }
            .feature-list li:before {
              content: "✨";
              position: absolute;
              left: 0;
            }
            .button {
              display: inline-block;
              padding: 15px 30px;
              background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
              color: white;
              text-decoration: none;
              border-radius: 30px;
              font-weight: bold;
              margin: 20px 0;
              text-align: center;
              box-shadow: 0 4px 6px rgba(99, 102, 241, 0.2);
              transition: transform 0.2s;
            }
            .button:hover {
              transform: translateY(-2px);
            }
            .social-links {
              background: white;
              padding: 20px;
              border-radius: 12px;
              text-align: center;
              margin: 20px 0;
            }
            .social-links a {
              display: inline-block;
              margin: 0 10px;
              color: #6366f1;
              text-decoration: none;
              font-weight: 500;
            }
            .footer {
              text-align: center;
              color: #6b7280;
              font-size: 14px;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
            }
            .highlight {
              color: #6366f1;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to BlogVerse! 🎉</h1>
              <p>Your journey to amazing content begins here</p>
            </div>
            
            <div class="content">
              <div class="welcome-message">
                Hello <span class="highlight">${name}</span>! 👋
              </div>
              
              <p>We're thrilled to have you join our community of creative minds and passionate writers!</p>
              
              <div class="feature-box">
                <div class="feature-title">🌟 What's waiting for you:</div>
                <ul class="feature-list">
                  <li>Share your unique stories and insights</li>
                  <li>Connect with fellow writers</li>
                  <li>Discover inspiring content</li>
                  <li>Build your personal brand</li>
                </ul>
              </div>

              <div style="text-align: center;">
                <a href="http://localhost:3000/" class="button">
                  Explore Blogs 🚀
                </a>
              </div>

              <div class="feature-box">
                <div class="feature-title">🎯 Quick Start Guide:</div>
                <ul class="feature-list">
                  <li>Create your first blog post</li>
                  <li>Customize your profile</li>
                  <li>Follow your favorite topics</li>
                  <li>Engage with the community</li>
                </ul>
              </div>
            </div>

            <div class="social-links">
              Stay Connected:
              <a href="#">📱 Instagram</a> |
              <a href="#">🐦 Twitter</a> |
              <a href="#">👥 Facebook</a>
            </div>
            
            <div class="footer">
              <p>You're receiving this email because you signed up for Blog Community.</p>
              <p>Email sent to: ${userEmail}</p>
              <p>© 2024 Blog Community. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    });

    console.log("Welcome email sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw error;
  }
}

// Signup

exports.createUser = async (req, res) => {
  let data = req.body;

  try {
    // ✅ Google reCAPTCHA verify karo (await ka use karo)
    const SECRET_KEY = "6LfwiuIqAAAAAB1MWC-E6vlnuhB6S8woxPc-2YvE";
    const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${data.reCAPTCHAValue}`;

    const response = await axios.post(verifyURL);

    if (!response.data.success) {
      throw new Error("You are not a human");
    }

    // ✅ Form validation
    if (!data.name || !data.email || !data.password)
      throw new Error("All fields are required");

    if (!data.email.includes("@gmail.com"))
      throw new Error("Invalid Email");

    let userData = await userModel.findOne({ email: data.email });
    if (userData) throw new Error("User Already Exists");

    if (data.password.length < 8)
      throw new Error("Password must be at least 8 characters long");

    // ✅ Password Hashing
    req.body.password = await bcrypt.hash(req.body.password, 10);
    let newUser = await userModel.create(data);

    // ✅ Welcome Email (Agar required ho)
    await sendWelcomeEmail(data.email, data.name);

    // ✅ Success Response
    res.status(200).json({
      status: "Success",
      Message: "User Created Successfully",
      Data: newUser,
    });

  } catch (error) {
    // ✅ Error Handling
    console.error(error, "Error from backend");
    res.status(400).json({
      status: "Fail",
      Message: error.message,
    });
  }
};

exports.getUser = async (req , res) => {

    try {
        let userData = await userModel.find()
        res.status(200).json({
            status : 'Success' , 
            Message : 'User Get Successfully' , 
            Data : userData
        })
    } catch (error) {
        res.status(404).json({
            status : 'Fail' , 
            Message : error.message
        })
    }
}

exports.getUserById = async ( req ,res ) => {

  const id = req.params.id
  try {
    let user = await userModel.findOne({ _id : id })
    res.status(200).json({
      status : 'Success' , 
      Message : 'User Get Successfully' , 
      Data : user
    })
    
  } catch (error) {
    res.status(404).json({
      status : 'Fail' , 
      Message : error.message
    })
  }
}


// Login

exports.loginUser = async (req , res) => {

    try {

        if(req.body.email === '' || req.body.password === '') 
        throw new Error('All fields are required')

        let loginData = await userModel.findOne({email : req.body.email})
        if(!loginData) throw new Error('User Not Found')
            
        let verifyPassword = await bcrypt.compare(req.body.password , loginData.password)
        if(!verifyPassword) throw new Error('Invalid Password')
          
        let token = jwt.sign({ id : loginData._id , name : loginData.name}, process.env.SECRET_KEY)
        
        res.status(200).json({
            status : 'Success' , 
            Message : 'User Login Success' , 
            Data : loginData ,
            token
        })
        
    } catch (error) { 
        res.status(404).json({
            status : 'Fail' , 
            Message : error.message
        })
    }
}