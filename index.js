const { app, BrowserWindow, TouchBar } = require('electron');
const { TouchBarButton } = TouchBar;

let isStart = true;
let map = [0, 0, 0, 2, 1, 1, 1];
const values = ['👻', '👽'];

const logic = (idx) => {
  const a = map[idx] ? -1 : 1;
  const b = map[idx] ? -2 : 2;

  if(map[idx + a] === 2) {
    map[idx + a] = map[idx];
    map[idx] = 2;
  }

  if(map[idx + b] === 2) {
    map[idx + b] = map[idx];
    map[idx] = 2;
  }
};

const check = () => {
  if (map[0] === map[1] && map[1] === map[2] && map[2] === 1
    && map[6] === map[5] && map[5] === map[4] && map[4] === 0) {
    isStart = false;

    const caption = ['Y', 'O', 'U' , '', 'W', 'I', 'N'];

    buttons.map((button, idx) => {
      button.label = caption[idx];
      button.backgroundColor = '#fff';
    });
  }
};

const restart = () => {
  map = [0, 0, 0, 2, 1, 1, 1];
  isStart = true;

  buttons.map((button, idx) => {
    button.label = values[map[idx]];
    button.backgroundColor = null;
  });
};

const update = () => {
  buttons.map((button, idx) => {
    button.label = values[map[idx]];
  });
};

const buttons = map.map((value, idx) => new TouchBarButton({
  label: values[value],
  click: () => {
    if (isStart) {
      logic(idx);
      update();
      check();
    } else if (idx === 3) {
      restart();
    }
  }
}));

const restartButton = new TouchBarButton({
  label: '🔄',
  click: restart
});

const touchBar = new TouchBar({
  items: [...buttons, restartButton],
});

let window;

app.once('ready', () => {
  window = new BrowserWindow({
    frame: false,
    titleBarStyle: 'hiddenInset',
    width: 200,
    height: 200,
    backgroundColor: '#000'
  });

  window.loadURL('about:blank');
  window.setTouchBar(touchBar);
});