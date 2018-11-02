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
// db.User.create({
//   first_name: "Clark",
//   last_name: "Nielsen",
//   email: "clark.nielsen@potato.com",
//   password: "clark",
//   token: encrypt.encrypt("clark.nielsen@potato.com","clark")
// })
//////////////////
/// Project
/////////////////
setTimeout(()=>{
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
},500);
//////////////////
/// Sprint
/////////////////
setTimeout(()=>{
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
    isActive: true,
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
    isActive: true,
    project_id: 3
  });
  //9
  db.Sprint.create({
    name: "Phase 1: Collecting Boogers.",
    start_date: "2018-10-22",
    end_date: "2018-11-09",
    isComplete: false,
    isActive: true,
    project_id: 4
  });
  db.Sprint.create({
    name: "What is the meaning of life.",
    start_date: "2018-10-22",
    end_date: "2018-11-09",
    isComplete: false,
    isActive: true,
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
},750);
//////////////////
/// SprintMembership
/////////////////
setTimeout(()=>{
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
},1000);
//////////////////
/// Task
/////////////////
setTimeout(()=>{
  db.Task.create({
    name: "Define what a dummy is.",
    due_date: "2018-09-04",
    sprint_id: 1,
    description: "Like a doll?",
    complexity: 4,
    assigned_id: 1,
    stack: "Javascript",
    isComplete: true,
    estimatedTimeToComplete: 15,
    estimatedTimeWorked: 16
  });
  db.Task.create({
    name: "Are dummies edible?",
    due_date: "2018-09-05",
    sprint_id: 1,
    description: "What strange thoughts.",
    complexity: 3,
    assigned_id: 1,
    stack: "CSS",
    isComplete: true,
    estimatedTimeToComplete: 2,
    estimatedTimeWorked: 13
  });
  db.Task.create({
    name: "Realizing an impending dummy army is inevitable if not stopped.",
    due_date: "2018-09-07",
    sprint_id: 1,
    description: "Let's start eating dummies.",
    complexity: 2,
    assigned_id: 10,
    stack: "Javascript",
    isComplete: true,
    estimatedTimeToComplete: 1,
    estimatedTimeWorked: 11
  });
  db.Task.create({
    name: "Determine if cooking dummies is the way to go.",
    due_date: "2018-09-20",
    sprint_id: 2,
    description: "Balls likes them raw.",
    complexity: 5,
    assigned_id: 11,
    stack: "Javascript",
    isComplete: true,
    estimatedTimeToComplete: 2,
    estimatedTimeWorked: 5
  });
  db.Task.create({
    name: "Wonder if that pang in your stomach is normal.",
    due_date: "2018-09-22",
    sprint_id: 2,
    description: "Do they have doctors for things like this?",
    complexity: 3,
    assigned_id: 12,
    stack: "Javascript",
    isComplete: true,
    estimatedTimeToComplete: 3,
    estimatedTimeWorked: 1
  });
  db.Task.create({
    name: "Clean up evidence.",
    due_date: "2018-10-02",
    sprint_id: 3,
    description: "This is a mess.",
    complexity: 3,
    assigned_id: 13,
    stack: "HTML",
    isComplete: true,
    estimatedTimeToComplete: 2,
    estimatedTimeWorked: 1
  });
  db.Task.create({
    name: "Try again with bleach.",
    due_date: "2018-10-03",
    sprint_id: 3,
    description: "Like that episode in Breaking Bad.",
    complexity: 4,
    assigned_id: 1,
    stack: "HTML",
    isComplete: true,
    estimatedTimeToComplete: 1,
    estimatedTimeWorked: 2
  });
  db.Task.create({
    name: "Hunt new dummies",
    due_date: "2018-11-02",
    sprint_id: 4,
    description: "Hunt new dummies to eat. What's wrong with us.",
    complexity: 4,
    stack: "Javascript",
    estimatedTimeToComplete: 4
  });
  db.Task.create({
    name: "Get some Tums",
    due_date: "2018-11-06",
    sprint_id: 4,
    description: "Eating dummies can irritate the belly.",
    complexity: 1,
    stack: "CSS",
    estimatedTimeToComplete: 1
  });
  db.Task.create({
    name: "Reconsider the life choice of being a cannibal.",
    due_date: "2018-11-7",
    sprint_id: 4,
    description: "This is kinda' not good.",
    complexity: 2,
    stack: "HTML",
    estimatedTimeToComplete: 3
  });
  db.Task.create({
    name: "Hunt babies instead.",
    due_date: "2018-11-08",
    sprint_id: 4,
    description: "Anyone ever read 'A Modest Proposal'?",
    complexity: 2,
    stack: "React",
    estimatedTimeToComplete: 15
  });
  db.Task.create({
    name: "Read up on what React is.",
    due_date: "2018-11-02",
    sprint_id: 8,
    description: "Maybe we shouldn't have thrown our old framework in the trash.",
    complexity: 2,
    stack: "React",
    estimatedTimeToComplete: 1
  });
  db.Task.create({
    name: "Decide if crying in the corner is better than using Polymer again.",
    due_date: "2018-11-04",
    sprint_id: 8,
    description: "It's real bad you guys.",
    complexity: 4,
    stack: "React",
    estimatedTimeToComplete: 2
  });
  db.Task.create({
    name: "Listen to Michael talk about how Polymer 3 is way better you guys.",
    due_date: "2018-11-07",
    sprint_id: 8,
    description: "Let's just use React.",
    complexity: 3,
    stack: "React",
    estimatedTimeToComplete: 48
  });
  db.Task.create({
    name: "Actually install React now.",
    due_date: "2018-11-08",
    sprint_id: 8,
    description: "This probably didn't need a week with a team of people.",
    complexity: 2,
    stack: "React",
    estimatedTimeToComplete: 16
  });
  db.Task.create({
    name: "Start digging in your own nose for boogers.",
    due_date: "2018-11-02",
    sprint_id: 9,
    description: "But do it with javascript.",
    complexity: 5,
    stack: "Javascript",
    estimatedTimeToComplete: 32
  });

  db.Task.create({
    name: "Consider the possiblilty of constructing a webpage with boogers.",
    due_date: "2018-11-03",
    sprint_id: 9,
    description: "Ask Unkindman why we do this.",
    complexity: 5,
    stack: "HTML",
    estimatedTimeToComplete: 24
  });

  db.Task.create({
    name: "Consider trashing this project.",
    due_date: "2018-11-05",
    sprint_id: 9,
    description: "42.",
    complexity: 1,
    stack: "HTML",
    estimatedTimeToComplete: 2
  });
  db.Task.create({
    name: "Is the answer 42?",
    due_date: "2018-11-02",
    sprint_id: 10,
    description: "Of course it is. But we should get someone on it to confirm.",
    complexity: 1,
    stack: "CSS",
    estimatedTimeToComplete: 10
  });
  db.Task.create({
    name: "Wonder why you set a sprint for this.",
    due_date: "2018-11-02",
    sprint_id: 10,
    description: "Job creation though.",
    complexity: 3,
    stack: "Node.js",
    estimatedTimeToComplete: 9
  });
  db.Task.create({
    name: "Send someone to get the coffee.",
    due_date: "2018-11-02",
    sprint_id: 10,
    description: "Because being busy is more important than what we're actually doing.",
    complexity: 3,
    stack: "Node.js",
    estimatedTimeToComplete: 5
  });
  db.Task.create({
    name: "Code your existential crisis away with javascript.",
    due_date: "2018-11-02",
    sprint_id: 10,
    description: "We might need a new sprint for this.",
    complexity: 5,
    stack: "Javascript",
    estimatedTimeToComplete: 12
  });
},1250);
