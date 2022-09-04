// chrome.tabs.getSelected(null, function (tab) {
//   alert(tab.title);
//   alert(tab.url);
// });

chrome.commands.onCommand.addListener(function (command) {
  console.log("Command:", command);
  let url = null;
  // split `command@url`
  if (command.indexOf("@") > -1) {
    const idx = command.indexOf("@");
    url = command.substring(1 + idx, command.length);
    command = command.substring(0, idx);
  }
  chrome.tabs.query(
    {
      // currentWindow: true,
    },
    function (tabs) {
      // console.log(tabs);
      // find the target tab
      for (const tab of tabs) {
        if (tab.title.indexOf(command) > -1) {
          console.log(tab.title);
          // switch tab
          chrome.tabs.highlight({ windowId: tab.windowId, tabs: tab.index });

          // switch window
          chrome.windows.update(tab.windowId, { focused: true });

          return;
        }
      }
      // open a new tab if not exist
      window.open(url);
    }
  );
});

console.log(chrome.tabs);
