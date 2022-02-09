function clickBtn() {
  chrome.windows.getAll({ populate: true }, (windows) => {
    let allTabs = [];
    windows.forEach(function (window) {
      allTabs = allTabs.concat(window.tabs);
    });
    console.log(allTabs);
    postData(allTabs);
  });
}

async function postData(tabs) {
  // Default options are marked with *
  const response = await fetch(
    "https://onzdmvk1ad.execute-api.ap-south-1.amazonaws.com/storeBrowserTabs",
    {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: email.value,
        backupName: backupName.value,
        tabs: [...tabs],
      }),
    }
  );
  return response.json(); // parses JSON response into native JavaScript objects
}

let backupTabsButton = document.getElementById("backupTabsButton");
let email = document.getElementById("email");
let backupName = document.getElementById("backupName");

backupTabsButton.addEventListener("click", clickBtn);
