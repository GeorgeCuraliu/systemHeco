const { PrismaClient } = require('@prisma/client');
const express = require('express');
const cors = require('cors');
const formData = require('form-data');
const Mailgun = require('mailgun.js');

const app = express();
const port = 3000;
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());










process.on('message', function(msg) {//for windows shut down or system error that will restart the file
  if (msg == 'shutdown') {
    console.log('Closing all connections...')
    

    alertAdmins(0);
    
    
    process.exit(0);

  }
})


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











  const crashTest = async () => {//just a carsh test
    await new Promise(resolve => setTimeout(resolve, 3000));
    //process.exit(0);
  }










app.listen(port, () => {
  console.log(process.env.ENDPOINT)
  console.log(`Server is running on http://localhost:${port}`);
});