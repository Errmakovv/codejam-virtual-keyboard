import { keys } from './data.js'; 

const textarea = document.createElement('textarea');
textarea.className = 'textarea';
document.body.appendChild(textarea);
textarea.focus();
const keyboard = document.createElement('div');
keyboard.className = 'keyboard';
document.body.appendChild(keyboard);

let shift = false;
let caps = false;
let lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'ru';
let size = 0;

for (let key in keys) {
  let btn = document.createElement('div');
  btn.id = key;
  btn.className = keys[key].class;
  btn.innerHTML = keys[key][lang][0];
  btn.addEventListener('click', (e) => {
    down(e.target.id);
    setTimeout(up, 150, e.target.id);
    e.preventDefault();
  })
  keyboard.appendChild(btn);
}

document.addEventListener('keydown', (e) => {
  down(e.code);
  e.preventDefault();
});

document.addEventListener('keyup', (e) => {
  up(e.code);
  e.preventDefault();
});

function down(id) {
  let btn = document.getElementById(id);

  btn.classList.add('active');

  if (keys[id].inner == true) {
    textarea.value += btn.innerText;
  } 
  else if (id == 'Backspace') {
    textarea.value = textarea.value.substring(0, textarea.value.length - 1);
  } 
  else if (id == 'Enter') {
    textarea.value += `\n`;
  } 
  else if (id == 'Tab') {
    textarea.value += `\t`;
  } 
  else if (id == 'Space') {
    textarea.value += ' ';
  }

  if (id == 'CapsLock') {
    caps = !caps;
    size = Math.abs(size - 1);
    for (let key in keys) {
      if (keys[key].inner) {
        let el = document.getElementById(key);
        el.innerHTML = keys[key][lang][size];
      }
    }
  }
  else
    if (id === 'ShiftRight' || id === 'ShiftLeft') {
      size = shift ? size : Math.abs(size - 1);
      shift = true;
      for (let key in keys) {
        let el = document.getElementById(key);
        el.innerHTML = keys[key][lang][size];
      }
    }
    else if ((id === 'AltRight' || id === 'AltLeft') && shift) {
      lang = (lang == 'ru') ? 'en' : 'ru';
      for (let key in keys) {
        let el = document.getElementById(key);
        el.innerHTML = keys[key][lang][size];
      }
    }
}

function up(id) {
  if (id !== 'CapsLock' || !caps) {
    let btn = document.getElementById(id);
    btn.classList.remove('active');
  }

  if (id === 'ShiftRight' || id === 'ShiftLeft') {
    shift = false;
    size = Math.abs(size - 1);
    for (let key in keys) {
      let el = document.getElementById(key);
      el.innerHTML = keys[key][lang][size];
    }
  }
}

window.addEventListener('beforeunload', () => {
  localStorage.setItem('lang', lang);
});