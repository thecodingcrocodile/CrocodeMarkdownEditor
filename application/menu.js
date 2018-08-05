const electron = require('electron');
const { app, BrowserWindow, Menu, dialog } = electron;
const Store = require('electron-store');
const store = new Store();



const template = (actions) => {

  const menu = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Create new',
          accelerator: 'CommandOrControl+N',
          click: () => actions.new()
        },
        {
          label: 'Open text file',
          accelerator: 'CommandOrControl+O',
          click: () => actions.openFile()
        },
        {type: 'separator'},
        {
          label: 'Save',
          accelerator: 'CommandOrControl+S',
          click: () => actions.saveCurrent()
        },
        {
          label: 'Save as...',
          click: () => actions.saveCurrentAs()
        },
        {type: 'separator'},
        {
          label: 'Create .zip from current',
          accelerator: 'CommandOrControl+Shift+T',
          click: () => actions.createZip()
        },
        { type: 'separator' },
        {
          label: 'Save html',
          accelerator: 'CommandOrControl+Shift+S',
          click: () => actions.saveHtml()
        },
        {
          label: 'Save html file as',
          accelerator: 'CommandOrControl+Shift+P',
          click: () => actions.printHtml()
        },
      ]
    },
    {
      label: 'View',
      submenu: [
        {role: 'reload'},
        {role: 'forcereload'},
        {role: 'toggledevtools'},
        {type: 'separator'},
        {role: 'resetzoom'},
        {role: 'zoomin'},
        {role: 'zoomout'},
        {type: 'separator'},
        {role: 'togglefullscreen'}
      ]
    },
    {
      role: 'window',
      submenu: [
        {role: 'minimize'},
        {role: 'close'}
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click () { require('electron').shell.openExternal('https://electronjs.org') }
        }
      ]
    }
  ]
  
  if (process.platform === 'darwin') {
    menu.unshift({
      label: app.getName(),
      submenu: [
        {role: 'about'},
        {type: 'separator'},
        {type: 'separator'},
        {role: 'hide'},
        {role: 'hideothers'},
        {role: 'unhide'},
        {type: 'separator'},
        {role: 'quit'}
      ]
    })

    // Window menu
    menu[4].submenu = [
      {role: 'close'},
      {role: 'minimize'},
      {role: 'zoom'},
      {type: 'separator'},
      {role: 'front'}
    ]
  }

  return menu
}


module.exports = template