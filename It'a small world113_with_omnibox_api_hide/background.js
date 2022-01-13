
//一応入れているが、下はなくても動くかもしれない
chrome.omnibox.onInputStarted.addListener(() => {
  console.log("User has started interacting with me.")
});

//suggestionの一番上にくる文言
chrome.omnibox.setDefaultSuggestion({
description: '<match>The world and values ​​are diverse!</match>',
}); 

//omniboxにテキストいれて第二言語のワードと一緒位検索できる。日本語部分は最後仕上げる
chrome.omnibox.onInputChanged.addListener((text, suggest) => {
console.log('inputChanged: ' + text);

suggest([
  {content: text + " different views", description: text + " different views"},
  {content: text + " biased?", description: text + " biased?"}
]);
});

//READMEに乗っているomniboxの見本からコピペしたもの
chrome.omnibox.onInputEntered.addListener(
function(text)
{
    chrome.tabs.getSelected(null, function(tab)
    {
        var url;
        if (text.substr(0, 7) == 'http://') {
            url = text;


        } else {
            url = 'https://www.google.com/search?q=' + text;
        }
        chrome.tabs.update(tab.id, {url: url});
    });
}
);


