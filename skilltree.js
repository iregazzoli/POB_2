// const skillTree = {
//   groups: {
//     1: {
//       x: 1200,
//       y: 1000,
//       orbits: [0, 2],
//       background: {
//         image: "PSGroupBackground2",
//       },
//       nodes: ["48477", "23507", "57248", "41689", "27276", "62831", "51220"],
//     },
//   },
//   nodes: {
//     48477: {
//       skill: 48477,
//       name: "Attack and Cast Speed",
//       icon: "Art/2DArt/SkillIcons/passives/attackspeed.png",
//       stats: ["4% increased Attack Speed", "4% increased Cast Speed"],
//       group: 472,
//       orbit: 2,
//       orbitIndex: 5,
//       out: ["5823"],
//       in: ["23507"],
//     },
//     23507: {
//       skill: 23507,
//       name: "Attack and Cast Speed",
//       icon: "Art/2DArt/SkillIcons/passives/attackspeed.png",
//       stats: ["4% increased Attack Speed", "4% increased Cast Speed"],
//       group: 472,
//       orbit: 2,
//       orbitIndex: 8,
//       out: ["48477"],
//       in: ["57248"],
//     },
//     57248: {
//       skill: 57248,
//       name: "Attack and Cast Speed",
//       icon: "Art/2DArt/SkillIcons/passives/attackspeed.png",
//       stats: ["4% increased Attack Speed", "4% increased Cast Speed"],
//       group: 472,
//       orbit: 2,
//       orbitIndex: 11,
//       out: ["23507"],
//       in: ["41689"],
//     },
//     41689: {
//       skill: 41689,
//       name: "Physical and Chaos Damage",
//       icon: "Art/2DArt/SkillIcons/passives/PhysicalandChaosDamage.png",
//       stats: ["12% increased Chaos Damage", "12% increased Physical Damage"],
//       group: 472,
//       orbit: 4,
//       orbitIndex: 30,
//       out: ["45272", "57248"],
//       in: ["51220"],
//     },
//     27276: {
//       skill: 27276,
//       name: "Physical and Chaos Damage",
//       icon: "Art/2DArt/SkillIcons/passives/PhysicalandChaosDamage.png",
//       stats: ["10% increased Chaos Damage", "10% increased Physical Damage"],
//       group: 472,
//       orbit: 2,
//       orbitIndex: 3,
//       out: ["62831"],
//       in: ["5823"],
//     },
//     62831: {
//       skill: 62831,
//       name: "Physical and Chaos Damage",
//       icon: "Art/2DArt/SkillIcons/passives/PhysicalandChaosDamage.png",
//       stats: ["10% increased Chaos Damage", "10% increased Physical Damage"],
//       group: 472,
//       orbit: 2,
//       orbitIndex: 0,
//       out: ["51220"],
//       in: ["27276"],
//     },
//     51220: {
//       skill: 51220,
//       name: "Physical and Chaos Damage",
//       icon: "Art/2DArt/SkillIcons/passives/PhysicalandChaosDamage.png",
//       stats: ["10% increased Chaos Damage", "10% increased Physical Damage"],
//       group: 472,
//       orbit: 2,
//       orbitIndex: 13,
//       out: ["41689"],
//       in: ["62831"],
//     },
//   },
// };

// function drawTree(skillTree) {
//   for (let group in skillTree.groups) {
//     let groupData = skillTree.groups[group];
//     drawGroup(groupData);
//   }
// }

// function drawGroup(group) {
//   let background;
//   let imageX;
//   let imageY;
//   if (group.background.image == "PSGroupBackground2") {
//     background = backgroundImageSrc;
//     imageX = 710;
//     imageY = 285;
//   }

//   const groupBackground = new Image();
//   groupBackground.onload = function () {
//     let groupBackgroundKonva = new Konva.Image({
//       image: groupBackground,

//       x: imageX,
//       y: imageY,
//       width: 200,
//       height: 180,
//     });
//     groupBackgroundKonva.crop({
//       x: imageX,
//       y: imageY,
//       width: 215,
//       height: 180,
//     });

//     layer.add(groupBackgroundKonva);
//     layer.draw();
//   };
//   //breaks here
//   groupBackground.src = background;
// }

// drawTree(skillTree);
