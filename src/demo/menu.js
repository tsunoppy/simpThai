//--------------------------------------------------

var nw = require('nw.gui');

//--------------------------------------------------

var win = nw.Window.get();
/*
win.showDevTools('', true);
win.on("devtools-opened", function(url) {
    console.log("devtools-opened: " + url);
    document.getElementById('devtools').src = url;
});
*/

//nw.Window.get().showDevTools();

//--------------------------------------------------

var menubar = new nw.Menu({
  type: 'menubar'
});

var fileMenu = new nw.Menu();

fileMenu.append(new nw.MenuItem({
  label: 'New File',
    click: function() {
	window.location.reload();
  }
}));

fileMenu.append(new nw.MenuItem({
  label: 'New File As New Window',
    click: function() {
	var gui = require('nw.gui');
	var link = window.location.href;
	var win = gui.Window.open (link, {
	    position: 'center',
	    width: 720,
	    height: 500
	});
  }
}));

fileMenu.append(new nw.MenuItem({
  label: 'Open',
    click: function() {
	OpenFile();
  }
}));
//////////////////////////////////////////////////////////////////////

/*
var openRecentMenu = new nw.Menu();

openRecentMenu.append(new nw.MenuItem({
  label: 'Recente File X',
  click: function() {
    alert('Clicked to open a recent file');
  }
}));

*/

menubar.append(new nw.MenuItem({ label: 'File', submenu: fileMenu}));
/*
fileMenu.append(new nw.MenuItem({ label: 'Open Recent File', submenu: openRecentMenu}));
*/


fileMenu.append(new nw.MenuItem({
    label: 'Save',
    click: function() {
	downloadAsFile( document.title + '.txt', '');
    }
}));

fileMenu.append(new nw.MenuItem({
  label: 'Print',
  click: function() {
      window.print();
  }
}));


fileMenu.append(new nw.MenuItem({
    label: 'Close',
    click: function() {
        win.close();
    }
}));

fileMenu.append(new nw.MenuItem({
    label: 'Exit',
    click: function() {
        nw.App.quit();
    }
}));

////////////////////////////////////////////////////////////////////////

var fileMenu2 = new nw.Menu();


fileMenu2.append(new nw.MenuItem({
    label: "Cut",
    click: function() {
	document.execCommand("cut");
    }
}));

fileMenu2.append(new nw.MenuItem({
    label: "Copy",
    click: function() {
	document.execCommand("copy");
    }
}));

fileMenu2.append(new nw.MenuItem({
    label: "Paste",
    click: function() {
	document.execCommand("paste");
    }
}));

fileMenu2.append(new nw.MenuItem({
    label: 'Insert Memo',
    click: function() {
	var ins = "";

	ins += "<p>";
	ins += "Comment,";
	ins += "</p>";
	ins += "<p>";
	ins += '<textarea name="example" cols="70" rows="8"></textarea>';
	ins += "</p>";
	document.getElementById('Insert').innerHTML = ins;
    }
}));


menubar.append(new nw.MenuItem({ label: 'Edit', submenu: fileMenu2}));

////////////////////////////////////////////////////////////////////////


var fileMenu3 = new nw.Menu();

fileMenu3.append(new nw.MenuItem({
  label: 'Maximimu',
    click: function() {
	win.maximize();
    }
}));


fileMenu3.append(new nw.MenuItem({
    label: 'Unmaximize',
    click: function() {
	win.unmaximize();
    }
}));

fileMenu3.append(new nw.MenuItem({
    label: 'Zoom 150%',
    click: function() {
	var zoomPercent = 150;
	win.zoomLevel = Math.log(zoomPercent/100) / Math.log(1.2);
    }
}));

fileMenu3.append(new nw.MenuItem({
    label: 'Zoom 125%',
    click: function() {
	var zoomPercent = 125;
	win.zoomLevel = Math.log(zoomPercent/100) / Math.log(1.2);
    }
}));

fileMenu3.append(new nw.MenuItem({
    label: 'Zoom 100%',
    click: function() {
	win.zoomLevel = 0;
    }
}));

fileMenu3.append(new nw.MenuItem({
    label: 'Zoom 75%',
    click: function() {
	var zoomPercent = 75;
	win.zoomLevel = Math.log(zoomPercent/100) / Math.log(1.2);
    }
}));

fileMenu3.append(new nw.MenuItem({
    label: 'Zoom 50%',
    click: function() {
	var zoomPercent = 50;
	win.zoomLevel = Math.log(zoomPercent/100) / Math.log(1.2);
    }
}));


menubar.append(new nw.MenuItem({ label: 'View', submenu: fileMenu3}));



////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

/*
var fileMenu3 = new nw.Menu();

fileMenu3.append(new nw.MenuItem({
  label: 'Home',
    click: function() {
	var gui = require('nw.gui');
	var link = "index.html";
	var win = gui.Window.open (link, {
	    position: 'mouse',
	    width: 720,
	    height: 500
	});
  }
}));


fileMenu3.append(new nw.MenuItem({
    label: 'Forward',
    click: function() {
	window.history.forward();
    }
}));

fileMenu3.append(new nw.MenuItem({
    label: 'Back',
    click: function() {
	window.history.back(-1);
	return false;
    }
}));


menubar.append(new nw.MenuItem({ label: 'Home', submenu: fileMenu3}));
*/

var fileMenu5 = new nw.Menu();

fileMenu5.append(new nw.MenuItem({
  label: 'About',
    click: function() {
	var link = "views/us.html";
	var win = nw.Window.open (link, {
	    position: 'center',
	    width: 450,
	    height: 300
	});
  }
}));

menubar.append(new nw.MenuItem({ label: 'Help', submenu: fileMenu5}));


////////////////////////////////////////////////////////////////////////

var win = nw.Window.get();
win.menu = menubar;


/*
////////////////////////////////////////////////////////////////////////
var tray = new nw.Tray({
  icon : 'my-app-icon.png',
  title: 'My App Tray'
});

var menu = new nw.Menu();
menu.append(new nw.MenuItem({
  label: 'Do something'
}));

tray.menu = menu;
*/

