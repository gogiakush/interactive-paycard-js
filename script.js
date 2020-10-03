document.addEventListener("DOMContentLoaded", init);

function init() {
  makeCode();
  changeCode();
  makeHolder();
  changeHolder();
  makeExpiry();
  changeExpiry();
  makeCW();
  changeCW();
  moveBrands();
  document.querySelector('#cw').addEventListener('focus', () => {
    document.querySelector('.card').classList.add('flip-ready');
  })

  document.querySelector('#cw').addEventListener('blur', () => {
    document.querySelector('.card').classList.remove('flip-ready');
  })
}

function makeCode() {
  for(let i = 0; i < 4; i++) {
    let codeBlock = document.createElement('div');
    codeBlock.classList.add('code-block');

    for(let j = 0; j < 4; j++) {
      let hash = document.createElement('div');
      hash.classList.add('hash');
      hash.innerHTML = '#';
      codeBlock.appendChild(hash);
    }

    document.querySelector('#code').appendChild(codeBlock);
  }
}

let is_new = true;
const regex = /\D/g;

function changeCode() {
  document.querySelector('#cardnum').addEventListener('keydown', (e) => {
    setTimeout(() => {
      document.querySelector('#cardnum').value = document.querySelector('#cardnum').value.replaceAll(regex, '');
      if (document.querySelector('#cardnum').value.length > 16) {
        let num = e.target.selectionStart;
        document.querySelector('#cardnum').value = document.querySelector('#cardnum').value.substring(0, 16);
        e.target.selectionStart = num;
        e.target.selectionEnd = num;
      }
        if (document.querySelector('#cardnum').value.length === 0) {
          document.querySelector('#code').innerHTML = '';
          is_new = true;
          makeCode();
        } else if (e.keyCode == 8 && e.target.selectionStart != 0) {
          let hashes = document.querySelectorAll('.hash');

          for (let i = e.target.selectionStart; i < document.querySelector('#cardnum').value.length; i++) {
            hashes[i].innerHTML = hashes[i + 1].innerHTML;
          }

          hashes[document.querySelector('#cardnum').value.length].preventDefault;
          hashes[document.querySelector('#cardnum').value.length].classList.remove('run-animation');
          void hashes[document.querySelector('#cardnum').value.length].offsetWidth;
          hashes[document.querySelector('#cardnum').value.length].classList.add('run-animation');
          hashes[document.querySelector('#cardnum').value.length].innerHTML = '#';
        } else if (e.keyCode >= 48 && e.keyCode <= 57) {
          let hashes = document.querySelectorAll('.hash');

          for (let i = Math.min(document.querySelector('#cardnum').value.length, 15); i > e.target.selectionStart - 1 && i < 16; i--) {
            hashes[i].innerHTML = hashes[i - 1].innerHTML;
          }

          hashes[e.target.selectionStart - 1].preventDefault;
          hashes[e.target.selectionStart - 1].classList.remove('run-animation');
          void hashes[e.target.selectionStart - 1].offsetWidth;
          if (e.target.selectionStart - 1 < 15 || hashes[e.target.selectionStart - 1].innerHTML == '#') {
            hashes[e.target.selectionStart - 1].classList.add('run-animation');
          }
          hashes[e.target.selectionStart - 1].innerHTML = document.querySelector('#cardnum').value[e.target.selectionStart - 1];
        }
      
    }, 10)
  })
}

function makeHolder() {
  let lets = ['n', 'a', 'm', 'e']

  for(let i = 0; i < lets.length; i++) {
    let letter = document.createElement('div');
    letter.classList.add('letter');
    letter.innerHTML = lets[i];
    document.querySelector('#holderval').appendChild(letter);
  }
}

let isNew = true;

function changeHolder() {
  document.querySelector('#cardname').addEventListener('keydown', (e) => {
    setTimeout(() => {
      if (document.querySelector('#cardname').value.length === 0) {
        document.querySelector('#holderval').innerHTML = '';
        isNew = true;
        makeHolder();
      } else if (e.keyCode == 8) {
        let letter = document.querySelector('#holderval').childNodes[e.target.selectionStart];
        letter.preventDefault;
        letter.classList.remove('alet');
        letter.classList.remove('dlet');
        void letter.offsetWidth;
        letter.classList.add('dlet');
        setTimeout(() => {
          document.querySelector('#holderval').removeChild(letter);
        }, 150)
      } else if (e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40) {
        if (isNew) {
          document.querySelector('#holderval').innerHTML = '';
          isNew = false;
        }

        let letter = document.createElement('div');
        letter.classList.add('letter');
        letter.innerHTML = document.querySelector('#cardname').value[e.target.selectionStart - 1];
        document.querySelector('#holderval').insertBefore(letter, document.querySelector('#holderval').childNodes[e.target.selectionStart - 1]);
        letter.preventDefault;
        letter.classList.remove('alet');
        void letter.offsetWidth;
        letter.classList.add('alet');
      }
    }, 10)
  })
}

function makeExpiry() {
  let lets = ['mm', '/', 'yy'];

  for (let i = 0; i < lets.length; i++) {
    let letter = document.createElement('div');
    letter.classList.add('letter');
    letter.innerHTML = lets[i];
    document.querySelector('#dateval').appendChild(letter);
  }
}

function changeExpiry() {
  document.querySelector('#month').addEventListener('change', () => {
    let val = document.querySelector('#month').value;
    document.querySelector('#dateval').childNodes[0].preventDefault;
    document.querySelector('#dateval').childNodes[0].classList.remove('run-animation');
    void document.querySelector('#dateval').childNodes[0].offsetWidth;
    document.querySelector('#dateval').childNodes[0].classList.add('run-animation');
    if(val !== 'm') {
      document.querySelector('#dateval').childNodes[0].innerHTML = val;
    } else {
      document.querySelector('#dateval').childNodes[0].innerHTML = 'MM';
    }
  })

  document.querySelector('#year').addEventListener('change', () => {
    let val = document.querySelector('#year').value;
    document.querySelector('#dateval').childNodes[2].preventDefault;
    document.querySelector('#dateval').childNodes[2].classList.remove('run-animation');
    void document.querySelector('#dateval').childNodes[2].offsetWidth;
    document.querySelector('#dateval').childNodes[2].classList.add('run-animation');
    if (val !== 'y') {
      document.querySelector('#dateval').childNodes[2].innerHTML = val;
    } else {
      document.querySelector('#dateval').childNodes[2].innerHTML = 'YY';
    }
  })
}


let isnew = true;

function makeCW() {
  let lets = ['c', 'v', 'v'];

  for (let i = 0; i < lets.length; i++) {
    let letter = document.createElement('div');
    letter.classList.add('letter');
    letter.innerHTML = lets[i];
    document.querySelector('#cwval').appendChild(letter);
  }
}

function changeCW() {
  document.querySelector('#cw').addEventListener('keydown', (e) => {
    setTimeout(() => {
      document.querySelector('#cw').value = document.querySelector('#cw').value.replaceAll(regex, '');
      if (document.querySelector('#cw').value.length > 4) {
        document.querySelector('#cw').value = document.querySelector('#cw').value.substring(0, 4);
      } else {
        if (document.querySelector('#cw').value.length === 0) {
          document.querySelector('#cwval').innerHTML = '';
          isnew = true;
          makeCW();
        } else if (e.keyCode == 8) {
          let letter = document.querySelector('#cwval').childNodes[e.target.selectionStart];
          letter.preventDefault;
          letter.classList.remove('alet');
          letter.classList.remove('dlet');
          void letter.offsetWidth;
          letter.classList.add('dlet');
          setTimeout(() => {
            document.querySelector('#cwval').removeChild(letter);
          }, 10)
        } else if (e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40) {
          if (isnew) {
            document.querySelector('#cwval').innerHTML = '';
            isnew = false;
          }

          let letter = document.createElement('div');
          letter.classList.add('letter');
          letter.innerHTML = '&#8226;';
          document.querySelector('#cwval').insertBefore(letter, document.querySelector('#cwval').childNodes[e.target.selectionStart - 1]);
          letter.preventDefault;
          letter.classList.remove('alet');
          void letter.offsetWidth;
          letter.classList.add('alet');
        }
      }
    }, 10);
  })
}

function moveBrands() {
  let brands = document.querySelectorAll('#brands img');
  for(let i = 0; i < brands.length; i++) {
    brands[i].style.animation = `movebrand 3s ease-in-out ${3.2*i}s 1`;
    brands[brands.length - 1].addEventListener("animationend", () => {
      brands[i].preventDefault;
      brands[i].style.animation = ``;
      void brands[i].offsetWidth;
      brands[i].style.animation = `movebrand 3s ease-out ${3.2 * i}s 1`;
    });
  }
}