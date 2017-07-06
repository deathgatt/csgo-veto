//INITIALIZE FIREBASE
var config = {
  apiKey: "AIzaSyBqeHPUtD_aChNKmg4oldt_K7IBqQhKLZw",
  authDomain: "csgo-veto-5a0cb.firebaseapp.com",
  databaseURL: "https://csgo-veto-5a0cb.firebaseio.com",
  projectId: "csgo-veto-5a0cb",
  storageBucket: "csgo-veto-5a0cb.appspot.com",
  messagingSenderId: "656665795388"
};
firebase.initializeApp(config);

//GENERATE AUTO-ID BY TIMESTAMP
function createRoomID() {
  window['roomID'] = new Date().getTime();
  console.log(roomID);
  firebase.database().ref('room/br3/' + roomID + '/team/').set({
    teamA: true,
    teamB: true,
  });
  firebase.database().ref('room/br3/' + roomID + '/ban/').set({
    cache: false,
    cbble: false,
    inferno: false,
    mirage: false,
    nuke: false,
    overpass: false,
    train: false
  });
  firebase.database().ref('room/br3/' + roomID + '/pick/').set({
    cache: false,
    cbble: false,
    inferno: false,
    mirage: false,
    nuke: false,
    overpass: false,
    train: false
  });
}
//USER TEAM SELECTOR
$('#a').click(function() {
  if (typeof roomID != 'undefined') {
    firebase.database().ref('room/br3/' + roomID + '/team/').set({
      teamA: false
    });
    $('#a').css({
      'color': 'grey',
      'cursor': 'not-allowed'
    })
  } else {
    alert('You need to create room first!')
  }
})
$('#b').click(function() {
  if (typeof roomID != 'undefined') {
    firebase.database().ref('room/br3/' + roomID + '/team/').set({
      teamB: false
    });
    $('#b').css({
      'color': 'grey',
      'cursor': 'not-allowed'
    })
  } else {
    alert('You need to create room first!')
  }
})

var teamA = true,
  teamB = false;

//COUNTDOWN FOR VOTE EVENTS
var count = 10;
function countDown() {
  if (count >= 0) {
    document.getElementById('count').innerHTML = count;
    count -= 1;
  }
  setTimeout(countDown, 1000);
}

//BAN EVENTS
const cache = document.getElementById('cache');
const cbble = document.getElementById('cbble');
const inferno = document.getElementById('inferno');
const mirage = document.getElementById('mirage');
const nuke = document.getElementById('nuke');
const overpass = document.getElementById('overpass');
const train = document.getElementById('train');

//DEBUG LOG
const UserList = document.getElementById('userList');
const dbRefUsers = firebase.database().ref();
dbRefUsers.on('value', snap => {
  UserList.innerHTML = JSON.stringify(snap.val(), null, 3);
});
