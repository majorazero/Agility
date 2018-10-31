const db = require("./models");
const encrypt = require("./helper/encrypt.js");

//////////////////
/// Users
/////////////////
for(let i = 0; i < 20; i++){
  let firstName = ["Winstonella", "Lincolnberry", "Randy", "Millyfille", "Nelly", "Sunny", "Yabooboo", "Rickety", "Zachadouche", "Xena", "Dourina", "Ethen", "Andy", "Hooky", "Tiki", "Popper", "Sebarstian", "Fronk","Balls"];
  let lastName = ["Tire-Fire","Banana-Pants","Bobert","Knickerknacker","No-Beard", "Melon-Baller", "Farts-A-Lot","Balls","Unkindman","Unkindwoman","Fathuman","Mailmanfurter","Hotdoggity","Cricket","Nichael"];
  db.User.create({
    first_name: firstName[Math.floor(Math.random()*firstName.length)],
    last_name: lastName[Math.floor(Math.random()*lastName.length)],
    email: `dummy${i}@dummy.com`,
    password: "dummy",
    token: encrypt.encrypt(`dummy${i}@dummy.com`,"dummy")
  });
}
//////////////////
/// Project
/////////////////
db.Project.create({
  name: "The Dummy Project",
  summary: "A project for dummies.",
  due_date: "2018-11-15",
  userId: 1
});
db.Project.create({
  name: "The Itch On MY Back",
  summary: "We're going to write a back scratching app. Implentation pending.",
  due_date: "2018-09-15",
  completed_date: "2018-09-15",
  complete: true,
  userId: 1
});
db.Project.create({
  name: "The Polymer Project",
  summary: "Dear god why LOL.",
  due_date: "2018-11-18",
  userId: 2
});
db.Project.create({
  name: "The Booger Project",
  summary: "A project for collectng boogers using javascript.",
  due_date: "2018-12-15",
  userId: 3
});
db.Project.create({
  name: "The Infinity Loop",
  summary: "We like recursions, so we're going to figure out how to run an inifinite amount of them without crashing our computer.",
  due_date: "2050-11-15",
  userId: 4
});
db.Project.create({
  name: "Algorithmically Rating Butts",
  summary: "A project for ordering butts in order from moldiest to fuzziest.",
  due_date: "2017-11-15",
  completed_date: "2017-11-15",
  userId: 5
});
//////////////////
/// Sprint
/////////////////
db.Sprint.create({
  name: "Find dummies.",
  start_date: "2018-09-03",
  end_date: "2018-09-14",
  isComplete: true,
  project_id: 1
});
db.Sprint.create({
  name: "Eat dummies.",
  start_date: "2018-09-17",
  end_date: "2018-09-28",
  isComplete: true,
  project_id: 1
});
db.Sprint.create({
  name: "Dispose of dummies.",
  start_date: "2018-10-01",
  end_date: "2018-10-12",
  isComplete: true,
  project_id: 1
});
db.Sprint.create({
  name: "Look for new dummies.",
  start_date: "2018-10-29",
  end_date: "2018-11-09",
  isComplete: false,
  project_id: 1
});
//5
db.Sprint.create({
  name: "Find itch.",
  start_date: "2018-10-01",
  end_date: "2018-10-05",
  isComplete: true,
  project_id: 2
});
db.Sprint.create({
  name: "Scratch itch.",
  start_date: "2018-10-08",
  end_date: "2018-10-12",
  isComplete: true,
  project_id: 2
});
//7
db.Sprint.create({
  name: "Throw it in trash.",
  start_date: "2018-10-08",
  end_date: "2018-10-19",
  isComplete: true,
  project_id: 3
});
db.Sprint.create({
  name: "Install React instead.",
  start_date: "2018-10-22",
  end_date: "2018-11-09",
  isComplete: false,
  project_id: 3
});
//9
db.Sprint.create({
  name: "Phase 1: Collecting Boogers.",
  start_date: "2018-10-22",
  end_date: "2018-11-09",
  isComplete: false,
  project_id: 4
});
db.Sprint.create({
  name: "What is the meaning of life.",
  start_date: "2018-10-22",
  end_date: "2018-11-09",
  isComplete: false,
  project_id: 5
});
//11
db.Sprint.create({
  name: "Create MVP.",
  start_date: "2018-10-01",
  end_date: "2018-10-05",
  isComplete: true,
  project_id: 6
});
db.Sprint.create({
  name: "Phase 2: Presentation Preparations.",
  start_date: "2018-10-08",
  end_date: "2018-10-12",
  isComplete: true,
  project_id: 6
});
db.Sprint.create({
  name: "Bug Testing and Deployment.",
  start_date: "2018-10-15",
  end_date: "2018-10-19",
  isComplete: true,
  project_id: 6
});
//////////////////
/// SprintMembership
/////////////////
db.SprintMembership.create({
  userId: 1,
  sprintId: 1,
  isAdmin: true
});
db.SprintMembership.create({
  userId: 10,
  sprintId: 1
});
db.SprintMembership.create({
  userId: 11,
  sprintId: 1
});
db.SprintMembership.create({
  userId: 12,
  sprintId: 1
});
db.SprintMembership.create({
  userId: 1,
  sprintId: 2,
  isAdmin: true
});
db.SprintMembership.create({
  userId: 10,
  sprintId: 2
});
db.SprintMembership.create({
  userId: 11,
  sprintId: 2
});
db.SprintMembership.create({
  userId: 12,
  sprintId: 2
});
db.SprintMembership.create({
  userId: 1,
  sprintId: 3,
  isAdmin: true
});
db.SprintMembership.create({
  userId: 10,
  sprintId: 3
});
db.SprintMembership.create({
  userId: 11,
  sprintId: 3
});
db.SprintMembership.create({
  userId: 13,
  sprintId: 3
});
db.SprintMembership.create({
  userId: 1,
  sprintId: 4,
  isAdmin: true
});
db.SprintMembership.create({
  userId: 10,
  sprintId: 4
});
db.SprintMembership.create({
  userId: 11,
  sprintId: 4
});
db.SprintMembership.create({
  userId: 1,
  sprintId: 5,
  isAdmin: true
});
db.SprintMembership.create({
  userId: 3,
  sprintId: 5
});
db.SprintMembership.create({
  userId: 4,
  sprintId: 5
});
db.SprintMembership.create({
  userId: 5,
  sprintId: 5
});
db.SprintMembership.create({
  userId: 1,
  sprintId: 6,
  isAdmin: true
});
db.SprintMembership.create({
  userId: 4,
  sprintId: 6
});
db.SprintMembership.create({
  userId: 5,
  sprintId: 6
});
db.SprintMembership.create({
  userId: 6,
  sprintId: 6
});
db.SprintMembership.create({
  userId: 2,
  sprintId: 7,
  isAdmin: true
});
db.SprintMembership.create({
  userId: 18,
  sprintId: 7
});
db.SprintMembership.create({
  userId: 19,
  sprintId: 7
});
db.SprintMembership.create({
  userId: 20,
  sprintId: 7
});
db.SprintMembership.create({
  userId: 2,
  sprintId: 8,
  isAdmin: true
});
db.SprintMembership.create({
  userId: 18,
  sprintId: 8
});
db.SprintMembership.create({
  userId: 19,
  sprintId: 8
});
db.SprintMembership.create({
  userId: 20,
  sprintId: 8
});
db.SprintMembership.create({
  userId: 3,
  sprintId: 9,
  isAdmin: true
});
db.SprintMembership.create({
  userId: 11,
  sprintId: 9
});
db.SprintMembership.create({
  userId: 10,
  sprintId: 9
});
db.SprintMembership.create({
  userId: 9,
  sprintId: 9
});
db.SprintMembership.create({
  userId: 4,
  sprintId: 10,
  isAdmin: true
});
db.SprintMembership.create({
  userId: 6,
  sprintId: 10
});
db.SprintMembership.create({
  userId: 2,
  sprintId: 10
});
db.SprintMembership.create({
  userId: 5,
  sprintId: 11,
  isAdmin: true
});
db.SprintMembership.create({
  userId: 20,
  sprintId: 11
});
db.SprintMembership.create({
  userId: 1,
  sprintId: 11
});
db.SprintMembership.create({
  userId: 5,
  sprintId: 12,
  isAdmin: true
});
db.SprintMembership.create({
  userId: 20,
  sprintId: 12
});
db.SprintMembership.create({
  userId: 1,
  sprintId: 12
});
db.SprintMembership.create({
  userId: 5,
  sprintId: 13,
  isAdmin: true
});
db.SprintMembership.create({
  userId: 20,
  sprintId: 13
});
db.SprintMembership.create({
  userId: 2,
  sprintId: 13
});
db.SprintMembership.create({
  userId: 1,
  sprintId: 13
});
//////////////////
/// Task
/////////////////
