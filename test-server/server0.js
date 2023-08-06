const { PrismaClient } = require('@prisma/client');
const express = require('express');
const cors = require('cors');
const formData = require('form-data');
const Mailgun = require('mailgun.js');
var cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');//encrypt the cookie token
const CryptoJS = require('crypto-js');//encrypt a word based on a key

const app = express();
const port = 3000;
const prisma = new PrismaClient();

app.use(cookieParser());
app.use(express.json());
app.use(cors());










process.on('message', (msg) => {//for windows shut down or system error that will restart the file
  if (msg == 'shutdown') {
    console.log('Closing all connections...')
    

    //alertAdmins(0);
    //disconnect from db, alert admins and die with honor
    
    process.exit(0);
    //die with honor
  }
})





//EXAMPLE FOR ENCRYPTING A USERNAME BASED ON A KEY
//UTF8
function encryptWord(word, key) {
  // Convert the key to a format accepted by AES (required 16 bytes / 128 bits)
  const keyBytes = CryptoJS.enc.Utf8.parse(key);

  // Encrypt the word using AES with the provided key
  const encrypted = CryptoJS.AES.encrypt(word, keyBytes, {
    mode: CryptoJS.mode.ECB, // Electronic Codebook mode (simplified for example)
    padding: CryptoJS.pad.Pkcs7, // PKCS#7 padding (simplified for example)
  });

  // Return the encrypted word as a base64-encoded string
  return encrypted.toString();
}

function decryptWord(encryptedWord, key) {
  // Convert the key to a format accepted by AES
  const keyBytes = CryptoJS.enc.Utf8.parse(key);

  // Decrypt the encrypted word using the provided key
  const decrypted = CryptoJS.AES.decrypt(encryptedWord, keyBytes, {
    mode: CryptoJS.mode.ECB, // Electronic Codebook mode (simplified for example)
    padding: CryptoJS.pad.Pkcs7, // PKCS#7 padding (simplified for example)
  });

  // Return the decrypted word as a UTF-8 string
  return decrypted.toString(CryptoJS.enc.Utf8);
}











//EXAMPLE FOR COOKIE PARSER + JSON WEB TOKENS

const secretKey = "yourActualSecretKey";
app.post('/login', (req, res) => {
  const username = encryptWord("i like banana", "secretservercode");
  console.log(username);
  jwt.sign({ username: username }, secretKey, (err, token) => {
    console.log(token);
    res.cookie('access_token', token, { maxAge: 86400 * 1000, httpOnly: true, sameSite: 'lax' });
    res.json({ message: 'Login successful' });
  });
});

// Endpoint to access protected data
app.get('/protected', (req, res) => {
  // Verify the token from the cookie
  console.log(req.cookies);
  
  const token = req.cookies.access_token;

  if (!token) {
    console.log("no data :(")
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Verify the token and extract the payload data
    const decoded = jwt.verify(token, secretKey);
    res.json({ message: `Hello, ${decoded.username}! This is a protected route.` });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});










app.post("/testEndpoint", (req, res) => {

  console.log("some processing thing here");

  prisma.user.create({data: {name: req.body.name, likedNumber: req.body.likedNumber}})
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    alertAdmins(826)
    res.status(200).send("data received but some critical error ocurred")
  })


})


app.post("/testAES", (req, res) => {
  console.log(testAES() + " sending the string to user")//gona need a promise to await for encryption(looks like AES is async)
  res.send(testAES());//without an async will return just UNDEFINED (THE ABSOLUTE)        
})



const alertAdmins = (errCode) => {

    //SAMLE CODE FOR SENDING ERROR MAILS

    const apiKey = process.env.API_KEY;
    const domain = process.env.DOMAIN;


    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({username: 'myComapny awd', key: apiKey});

    let sendDate = new Date();

    mg.messages.create(domain, {
      from: " SYS <test5270872@gmail.com>",
      to: ["georgecuraliu@gmail.com"],
      subject: "SYSTEM CRITICAL ERROR",
      text: `CRITICAL ERROR`,
      html: `CRITICAL ERROR AT --${errCode}-- AT ${sendDate.getDay()} ${sendDate.getHours()} ${sendDate.getMinutes()}`
    })
    .then(msg => console.log(msg)) // logs response data
    .catch(err => console.log(err));

}




const testAES = async () => {
  const encryptionKey = "awd";//will get these from request(key will be the password)
  const originalMessage = "some message";

  //cant use JSON.stringify() `cause the $super and the encrypted data

  // Encryption
  const encryptedData = CryptoJS.AES.encrypt(originalMessage, encryptionKey).toString();
  console.log("Encrypted Data:", encryptedData);

  // Store the encrypted data in the database (you can use this in your Prisma create method)
  const info = await prisma.user.create({ data: { name: encryptedData, likedNumber: 23 } });
  console.log("Stored Data Info:", info);

  // Decryption
  const encryptedDataFromDatabase = info.name; // Replace 'info.name' with the actual field name from your Prisma model.
  const decryptedData = CryptoJS.AES.decrypt(encryptedDataFromDatabase, encryptionKey).toString(CryptoJS.enc.Utf8);
  console.log("Decrypted Data:", decryptedData);

  return encryptedData; // You can choose to return the encrypted data or anything else as per your requirement.
}


//test21();



//PRISMA USE MODEL

const main = async () => {
  //const user = await prisma.user.create({data: {name: "kyle", likedNumber :23}})
  //const user = await prisma.user.findFirst()
  // const user = await prisma.user.findUnique({where: {name: "kyle"}})
  // const user = await prisma.user.update({where: {name: "kyle"}, data:{name: "vasily"}})
  //const user = await prisma.user.delete({where: {name:"vasily"}})
  //console.log(user)
}

main()
  .catch(err => {
    console.log(err)
  })
  .finally(async () => {
    await prisma.$disconnect();
  })











  const crashTest = async () => {//just a crash test(will crash the app -- app go boom boom)
    await new Promise(resolve => setTimeout(resolve, 3000));
    process.exit(0);
  }










app.listen(port, () => {
  console.log(process.env.ENDPOINT)
  console.log(`Server is running on http://localhost:${port}`);
});