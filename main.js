const { app, BrowserWindow, Menu, Tray, ipcMain, dialog } = require('electron');
const ipc = require('ipc');
const express = require('express')();
const fs = require('fs');
const url = require('url');
const path = require('path');

const menuTeplate = require('./application/menu');

let currentFile;

let mainWindow;
let addLoaderWindow;
let willQuitApp = false;

const actions = {
 openFile: () => {
  const file = dialog.showOpenDialog({properties: ['openFile' ]})
  fs.readFile(file[0], 'utf8', (err, content) => {
    if(err) return;
    mainWindow.webContents.send('content', content, file);
  })
 },
 new: () => {
  currentFile = undefined;
  mainWindow.webContents.send('content', '', currentFile);
 },
 saveCurrent: () => {
  mainWindow.webContents.send('getContentForSave');
 }
}


const createWindow = (props, window) => {
	window = new BrowserWindow(props);

	window.loadURL(url.format({
		pathname: path.join(__dirname, 'windows', 'mainWindow.html'),
		protocol: 'file:',
		slashes: true
	}));
};

app.on('ready', () => {
	

	mainWindow = new BrowserWindow({
		'minHeight': 600,
  	'minWidth': 900,
  	'height': 600,
  	'width': 900,
	});

	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'windows', 'mainWindow.html'),
		protocol: 'file:',
		slashes: true
	}));

	mainWindow.on('close', (e) => {
    if (willQuitApp) {
      mainWindow = null;
    } else {
      e.preventDefault();
      mainWindow.hide();
    }
  });

  ipcMain.on('open', (e, file) => {
    fs.readFile(file, 'utf8', (err, content) => {
      if(err) return;
      mainWindow.webContents.send('content', content, file);
    })
  });

  ipcMain.on('contentForSave', (e, content) => {
    if(!currentFile) {
      const directory = dialog.showSaveDialog();
      currentFile = directory;
      fs.writeFile(directory, content);
    } else {
      fs.writeFile(currentFile, content);
    }
    mainWindow.webContents.send('updateTitle', currentFile);
  })

  const menu = Menu.buildFromTemplate(menuTeplate(actions));
  Menu.setApplicationMenu(menu);
})

app.on('activate', () => {
	mainWindow.show();
});

app.on('before-quit', () => willQuitApp = true);





