'use strict';
const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      role: 'user',
      firstName:"Euri",
      lastName: "Tanaka",
      email: "eurimagic@gmail.com",
      userName: null,
      title: "The Confused",
      profession: ["Student at CSULB Bootcamp   Jan,2022 - Oct, 2022", "Student at CSUF   Aug 2022 - Present", "Actor   2018-Present"],
      biography: "A dude with too much hobbies who wants to make video games",
      skillList0:["Acting"],
      skillList1:["Javascript", "React","Node","SQL"],
      skillList2:["Weight lifting"],
      skillList3:["Scrum Master"],
      skillList4:["Team managment", "Scrum Master"],
      skillList5:["Story writing practice, Drawing practice"],
      skillLevel:[1,4,1,1,2,2],
      maxSkillLevel:0,
      isOnline: false,
      hubPosition:[100, 100],
      //favorites:[],
      passwordHash: await bcrypt.hash("12121212", 12),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      role: 'user',
      firstName:"Placeholder",
      lastName: "Bot",
      email: "placeholder@bot.com",
      userName: "[PH]",
      title: "The Placeholding",
      profession: ["Placeholding Profession!"],
      biography: "A placeholder biography! !",
      skillList0:["PH1"],
      skillList1:["PH1", "PH2"],
      skillList2:["PH1","PH2","PH3"],
      skillList3:["PH1","PH2","PH3","PH4"],
      skillList4:["PH1","PH2","PH3","PH4","PH5",],
      skillList5:["PH1","PH2","PH3","PH4","PH5","PH6",],
      skillLevel:[1,2,3,4,5,6],
      maxSkillLevel:0,
      isOnline: false,
      hubPosition:[100, 100],
      //favorites:[],
      passwordHash: await bcrypt.hash("12121212", 12),
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      role: 'user',
      firstName:"NOT",
      lastName: "GOD",
      email: "creator@everything.com",
      userName: "CREATOR",
      title: "The Almighty",
      profession: ["I exist, therefore with a meaning"],
      biography: "You acknowledged me,therefore I am",
      skillList0:["Almighty","Almighty","Almighty","Almighty","Almighty","Almighty","Almighty","Almighty","Almighty"],
      skillList1:["Almighty","Almighty","Almighty","Almighty","Almighty","Almighty","Almighty","Almighty","Almighty"],
      skillList2:["Almighty","Almighty","Almighty","Almighty","Almighty","Almighty","Almighty","Almighty","Almighty"],
      skillList3:["Almighty","Almighty","Almighty","Almighty","Almighty","Almighty","Almighty","Almighty","Almighty"],
      skillList4:["Almighty","Almighty","Almighty","Almighty","Almighty","Almighty","Almighty","Almighty","Almighty"],
      skillList5:["Almighty","Almighty","Almighty","Almighty","Almighty","Almighty","Almighty","Almighty","Almighty"],
      skillLevel:[99,99,99,99,99,99],
      maxSkillLevel:0,
      isOnline: false,
      hubPosition:[100, 100],
      //favorites:[],
      passwordHash: await bcrypt.hash("12121212", 12),
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      role: 'user',
      firstName:"",
      lastName: "",
      email: "the@unexpected.com",
      userName: "!@#$%^&*()",
      title: "The Unexpected",
      profession: ["The Confuser"],
      biography: "Put values that shouldnt happen for database for testing, default empty for skills",
      skillList0:[""],
      skillList1:[""],
      skillList2:[""],
      skillList3:[""],
      skillList4:[""],
      skillList5:[""],
      skillLevel:[0,0,0,0,0,0],
      maxSkillLevel:0,
      isOnline: false,
      hubPosition:[100, 100],
      //favorites:[],
      passwordHash: await bcrypt.hash("12121212", 12),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    
  ])


  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
