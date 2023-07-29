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
    


    //SAMLE CODE FOR SENDING ERROR MAILS

    // const apiKey = '269f09a8c3f36a921814441fe687f718-73f745ed-7dbcde75';
    // const domain = 'sandboxcb81f52fe3684ab986b971bdeed0bfa6.mailgun.org';


    // const mailgun = new Mailgun(formData);
    // const mg = mailgun.client({username: 'myComapny awd', key: apiKey});

    // let sendDate = new Date();

    // mg.messages.create(domain, {
    //   from: "<test5270872@gmail.com>",
    //   to: ["georgecuraliu@gmail.com"],
    //   subject: "SYSTEM CRITICAL ERROR    CODE--231",
    //   text: `CRITICAL ERROR AT --SOME ERROR-- AT ${sendDate.getDay()} ${sendDate.getHours()} ${sendDate.getMinutes()}`,
    //   html: "<h1>ACCES THE SERVER AS SOON AS POSSIBLE TO HANDLE THE ERROR FROM ERROR LOGS</h1>"
    // })
    // .then(msg => console.log("server admin alerted about the error")) // logs response data
    // .catch(err => console.log(err));
    


  }
})


const main = async () => {
  
}

main()
  .catch(err => {
    console.log("some criticial error happened")
  })
  .finally(async () => {
    await prisma.$disconnect();
  })


app.listen(port, () => {
  console.log(process.env.ENDPOINT)
  console.log(`Server is running on http://localhost:${port}`);
});