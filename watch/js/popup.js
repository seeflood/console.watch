// chrome.tabs.getSelected(null, function (tab) {
//   alert(tab.title);
//   alert(tab.url);
// });

chrome.commands.onCommand.addListener(function (command) {
  console.log("Command:", command);
  chrome.tabs.query(
    {
      // currentWindow: true,
    },
    function (tabs) {
      // console.log(tabs);
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
    }
  );
});

console.log(chrome.tabs);
