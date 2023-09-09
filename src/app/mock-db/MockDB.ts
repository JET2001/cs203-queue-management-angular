import { Location } from './../models/location';
import { User } from './../models/user';
import { Event } from "../models/event";
import { RegGroup } from '../models/reg-group';
import { Queue } from '../models/queue';
import { Show } from '../models/show';
import { SeatCategories } from '../models/seat-categories';

//=======================================================================
// Events DB
//=======================================================================
export const events : Event[] = [
  {
    eventID: 0,
    name: 'Taylor Swift The Eras Tour',
    image: 'taylor-swift.png',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    isHighlighted: true,
    countries: ["Mexico", "Argentina","Brazil", "Japan", "Australia", "Singapore", "France", "Sweden", "Portugal", "Spain"],
  },
  {
    eventID: 1,
    name: 'Coldplay: Music of the Spheres Tour',
    image: 'coldplay.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    countries:["Tokyo", "Kaohsiung City", "Jakarta", "Perth", "Kuala Lumpur", "Manila", "Singapore", "Bangkok"],
    isHighlighted: true,
  },
  {
    eventID: 2,
    name: "Guns N' Roses",
    image: 'guns_and_roses.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    countries: ["Middle East", "Europe", "America"],
    isHighlighted: false,
  },
  {
    eventID: 3,
    name: "Anson Seabra: The Neverland Tour",
    image: 'the-neverland-tour.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    countries: ['Taipei', 'Thailand', 'Singapore', 'Manila', 'Hong Kong', 'Paris'],
    isHighlighted: false,
  },
  {
    eventID: 4,
    name: "TWICE",
    image: 'twice.jpg',
    countries:['Europe','Mexico', 'Australia'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    isHighlighted: true

  }
];

//=======================================================================
// Shows DB
//=======================================================================
export const Users : User[] = [
  {
    userID: 0,
    mobileNo: "+6598231539",
    email: "jrteo.2022@smu.edu.sg",
    password: "password1",
    authenticatorID: "1",
    isVerified: true
  },
  {
    userID: 1,
    mobileNo: "+6598231539",
    email: "david.zhu.2022@smu.edu.sg",
    password: "password2",
    authenticatorID: "2",
    isVerified: true
  },
  {
    userID: 2,
    mobileNo: "+6581996653",
    email: "clarissatoh.2022@smu.edu.sg",
    password: "password3",
    authenticatorID: "3",
    isVerified: true
  },
  {
    userID: 3,
    mobileNo: "+6592366941",
    email: "benedictlee.2022@smu.edu.sg",
    password: "password4",
    authenticatorID: "4",
    isVerified: true
  },
  {
    userID: 4, // not authenticated user
    mobileNo: "+6581996653",
    email: "ryan.yap.2022@smu.edu.sg",
    password: "password5",
    isVerified: false
  }
];

// =================================================
// Users's Registration Group DB
// =================================================
export const RegGroups: RegGroup[] = [
  { // userIDs 1,2,3 go for Taylor Swift Concert (id 0), all users confirmed but not selected queues.
    groupID: 0,
    userIDs: [1,2,3],
    eventID: 0,
    hasAllUsersConfirmed: true,
  },
  { // userIDs 0,2,3 go for Coldplay (id 1), all users confirmed and selected queues
    groupID: 1,
    userIDs: [0,2,3],
    eventID: 1,
    queueIDs: [0,1],
    hasAllUsersConfirmed: true
  },
  { // userIDs 0,2,3 go for Anson Seabra (id 3), not all users have confirmed.
    groupID: 2,
    userIDs: [0,2,3],
    eventID: 3,
    hasAllUsersConfirmed: false
  },
  { // userID 0 goes alone to Taylor Swift (id 0), all users have confirmed, and he purchased a ticket.
    groupID: 3,
    userIDs: [0],
    eventID: 0,
    queueIDs: [101,102,103],
    hasAllUsersConfirmed: true,
    purchaseID: 1
  }
];

// =================================================
// Groups joins queue.
// =================================================
export interface Group_Register_Queue {
  groupID: number;
  queueID: number;
  queuePos: number;
}

export const GroupJoinsQueueTable: Group_Register_Queue[] = [
  {
    groupID: 1,
    queueID: 0,
    queuePos: 1000,
  },
  {
    groupID: 1,
    queueID: 1,
    queuePos: 500
  },
  {
    groupID: 3,
    queueID: 101,
    queuePos: 300
  },
  {
    groupID: 3,
    queueID: 102,
    queuePos: 100
  },
  {
    groupID: 3,
    queueID: 103,
    queuePos: 21
  }
];

// =================================================
// Queues DB.
// =================================================
export const queues: Queue[] = [
  { // Coldplay concerts have queueIDs 0 and 1
    queueID: 0,
    eventID: 1,
    showID: 0,
    queueStartTime: new Date("2023/07/19 22:30:00"),
    queueEndTime: new Date("2023/07/20 01:00:00")
  },
  {
    queueID: 1,
    eventID: 1,
    showID: 1, // night of the show
    queueStartTime: new Date("2023/07/20 22:30:00"),
    queueEndTime: new Date("2023/07/21 01:00:00")
  },
  {
    queueID: 101,
    eventID: 0,
    showID: 0, // first show
    queueStartTime: new Date("2023/07/01 22:30:00"),
    queueEndTime: new Date("2023/07/02 01:00:00")
  },
  {
    queueID: 102,
    eventID: 0,
    showID: 1, // second show
    queueStartTime: new Date("2023/07/02 22:30:00"),
    queueEndTime: new Date("2023/07/03 01:00:00")
  },
  {
    queueID: 103,
    eventID: 0,
    showID: 2, // third show
    queueStartTime: new Date("2023/07/03 22:30:00"),
    queueEndTime: new Date("2023/07/04 01:00:00")
  }
];

// =================================================
// Shows DB
// =================================================
export const shows : Show[] = [
  { // Put 3 taylor swift shows, 2 Coldplay, 2 Bones, 2 Anson and 1 Twice.
    eventID: 0,
    showID: 0,
    locationID: 0,
    showDateTime: new Date("02/03/2024 20:30:00")
  },
  {
    eventID: 0,
    showID: 1,
    locationID: 0,
    showDateTime: new Date("03/03/2024 20:30:00")
  },
  {
    eventID: 0,
    showID: 3,
    locationID: 0,
    showDateTime: new Date("04/03/2024 20:30:00")
  },
  {
    eventID: 1,
    showID: 0,
    locationID: 0,
    showDateTime: new Date("01/04/2024 20:30:00")
  },
  {
    eventID: 1,
    showID: 1,
    locationID: 1,
    showDateTime: new Date("02/04/2024 20:30:00")
  },
  {
    eventID: 2,
    showID: 0,
    locationID: 3,
    showDateTime: new Date("01/06/2024 20:30:00")
  },
  {
    eventID: 2,
    showID: 1,
    locationID: 3,
    showDateTime: new Date("02/06/2024 20:30:00")
  },
  {
    eventID: 3,
    showID: 0,
    locationID: 4,
    showDateTime: new Date("01/07/2024 20:30:00")
  },
  {
    eventID: 3,
    showID: 1,
    locationID: 3,
    showDateTime: new Date("02/07/2024 20:30:00")
  },
  {
    eventID: 4,
    showID: 0,
    locationID: 0,
    showDateTime: new Date("31/08/2024 20:30:00")
  },
]

// =================================================
// Location DB
// =================================================
export const locations: Location[] = [
  {
    locationID: 0,
    locationName: "Singapore National Stadium"
  },
  {
    locationID: 1,
    locationName: "Singapore, MediaCorp Theatre"
  },
  {
    locationID: 2,
    locationName: "Singapore, Gardens by the Bay"
  },
  {
    locationID: 3,
    locationName: "Singapore, Capitol Theatre"
  }
];

// ==================================================
// Seat Categories
// ==================================================
export const seatCategories: SeatCategories[] = [
  { // Taylor Swift show 1
    eventID: 0,
    showID: 0,
    categoryID: 0,
    name: "CAT 1",
    price: "SGD 348"
  },
  {
    eventID: 0,
    showID: 0,
    categoryID: 1,
    name: "CAT 2",
    price: "SGD 328"
  },
  {
    eventID: 0,
    showID: 0,
    categoryID: 2,
    name: "CAT 3",
    price: "SGD 288"
  },
  {
    eventID: 0,
    showID: 0,
    categoryID: 3,
    name: "CAT 4",
    price: "SGD 248"
  },
  {
    eventID: 0,
    showID: 0,
    categoryID: 4,
    name: "CAT 5",
    price: "SGD 168"
  },
  {
    eventID: 0,
    showID: 0,
    categoryID: 5,
    name: "CAT 6",
    price: "SGD 108",
  },
  { // Taylor Swift show 2
    eventID: 0,
    showID: 1,
    categoryID: 0,
    name: "CAT 1",
    price: "SGD 348"
  },
  {
    eventID: 0,
    showID: 1,
    categoryID: 1,
    name: "CAT 2",
    price: "SGD 328"
  },
  {
    eventID: 0,
    showID: 1,
    categoryID: 2,
    name: "CAT 3",
    price: "SGD 288"
  },
  {
    eventID: 0,
    showID: 1,
    categoryID: 3,
    name: "CAT 4",
    price: "SGD 248"
  },
  {
    eventID: 0,
    showID: 1,
    categoryID: 4,
    name: "CAT 5",
    price: "SGD 168"
  },
  {
    eventID: 0,
    showID: 1,
    categoryID: 5,
    name: "CAT 6",
    price: "SGD 108",
  },
  { // Taylor Swift show 3
    eventID: 0,
    showID: 2,
    categoryID: 0,
    name: "CAT 1",
    price: "SGD 348"
  },
  {
    eventID: 0,
    showID: 2,
    categoryID: 1,
    name: "CAT 2",
    price: "SGD 328"
  },
  {
    eventID: 0,
    showID: 2,
    categoryID: 2,
    name: "CAT 3",
    price: "SGD 288"
  },
  {
    eventID: 0,
    showID: 2,
    categoryID: 3,
    name: "CAT 4",
    price: "SGD 248"
  },
  {
    eventID: 0,
    showID: 2,
    categoryID: 4,
    name: "CAT 5",
    price: "SGD 168"
  },
  {
    eventID: 0,
    showID: 2,
    categoryID: 5,
    name: "CAT 6",
    price: "SGD 108",
  },
  { // Coldplay show 1 - 5 categories 2 VIP
    eventID: 1,
    showID: 0,
    categoryID: 0,
    name: "CAT 1",
    price: "SGD 348"
  },
  {
    eventID: 1,
    showID: 0,
    categoryID: 1,
    name: "CAT 2",
    price: "SGD 328"
  },
  {
    eventID: 1,
    showID: 0,
    categoryID: 2,
    name: "CAT 3",
    price: "SGD 288"
  },
  {
    eventID: 1,
    showID: 0,
    categoryID: 3,
    name: "CAT 4",
    price: "SGD 248"
  },
  {
    eventID: 1,
    showID: 0,
    categoryID: 4,
    name: "CAT 5",
    price: "SGD 168"
  },
  {
    eventID: 1,
    showID: 0,
    categoryID: 5,
    name: "VIP 1",
    price: "SGD 508"
  },
  {
    eventID: 1,
    showID: 0,
    categoryID: 4,
    name: "VIP 2",
    price: "SGD 408"
  },
  { // Coldplay show 2 - 5 categories 2 VIP
    eventID: 1,
    showID: 1,
    categoryID: 0,
    name: "CAT 1",
    price: "SGD 348"
  },
  {
    eventID: 1,
    showID: 1,
    categoryID: 1,
    name: "CAT 2",
    price: "SGD 328"
  },
  {
    eventID: 1,
    showID: 1,
    categoryID: 2,
    name: "CAT 3",
    price: "SGD 288"
  },
  {
    eventID: 1,
    showID: 1,
    categoryID: 3,
    name: "CAT 4",
    price: "SGD 248"
  },
  {
    eventID: 1,
    showID: 1,
    categoryID: 4,
    name: "CAT 5",
    price: "SGD 168"
  },
  {
    eventID: 1,
    showID: 1,
    categoryID: 5,
    name: "VIP 1",
    price: "SGD 508"
  },
  {
    eventID: 1,
    showID: 1,
    categoryID: 4,
    name: "VIP 2",
    price: "SGD 408"
  },
  { // Bones concert (id 3) - 3 categories, 2 shows (Show 1)
    eventID: 2,
    showID: 0,
    categoryID: 0,
    name: "CAT 1",
    price: "SGD 348"
  },
  {
    eventID: 2,
    showID: 0,
    categoryID: 1,
    name: "CAT 2",
    price: "SGD 328"
  },
  {
    eventID: 2,
    showID: 0,
    categoryID: 2,
    name: "CAT 3",
    price: "SGD 288"
  },
  { // Bones concert (id 2) - 3 categories, 2 shows (Show 2)
    eventID: 2,
    showID: 1,
    categoryID: 0,
    name: "CAT 1",
    price: "SGD 348"
  },
  {
    eventID: 2,
    showID: 1,
    categoryID: 1,
    name: "CAT 2",
    price: "SGD 328"
  },
  {
    eventID: 2,
    showID: 1,
    categoryID: 2,
    name: "CAT 3",
    price: "SGD 288"
  },
  { // Anson concert (id 3) - Show 1, 3 categories
    eventID: 3,
    showID: 0,
    categoryID: 0,
    name: "CAT 1",
    price: "SGD 348"
  },
  {
    eventID: 3,
    showID: 0,
    categoryID: 1,
    name: "CAT 2",
    price: "SGD 328"
  },
  {
    eventID: 3,
    showID: 0,
    categoryID: 2,
    name: "CAT 3",
    price: "SGD 288"
  },
  { // Anson Show 2 - 5 categories 2 VIP
    eventID: 3,
    showID: 1,
    categoryID: 0,
    name: "CAT 1",
    price: "SGD 348"
  },
  {
    eventID: 3,
    showID: 1,
    categoryID: 1,
    name: "CAT 2",
    price: "SGD 328"
  },
  {
    eventID: 3,
    showID: 1,
    categoryID: 2,
    name: "CAT 3",
    price: "SGD 288"
  },
  {
    eventID: 3,
    showID: 1,
    categoryID: 3,
    name: "CAT 4",
    price: "SGD 248"
  },
  {
    eventID: 3,
    showID: 1,
    categoryID: 4,
    name: "CAT 5",
    price: "SGD 168"
  },
  {
    eventID: 3,
    showID: 1,
    categoryID: 5,
    name: "VIP 1",
    price: "SGD 508"
  },
  {
    eventID: 3,
    showID: 1,
    categoryID: 4,
    name: "VIP 2",
    price: "SGD 408"
  },
  { // Twice Show 1 - 1 VIP and Others
    eventID: 4,
    showID: 0,
    categoryID: 1,
    name: "VIP 1",
    price: "SGD 250"
  },
  {
    eventID: 4,
    showID: 0,
    categoryID: 2,
    name: "Non-VIP",
    price: "SGD 150"
  }
];