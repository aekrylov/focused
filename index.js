function del(elem) {
    //todo debug
    //elem.parentNode.removeChild(elem);
    elem.style.display = 'none';
}

const rules = {
    'habr.com': function f() {
        //сайдбары
        for (let sidebar of document.getElementsByClassName('sidebar')) {
            del(sidebar);
        }

        //самое читаемое
        del(document.getElementById('broadcast_tabs_posts').parentElement.parentElement);
    },
    'vk.com': function () {
        //лента
        del(document.getElementById('main_feed'));
    }
};

//execute all matching rules
for (let rule in rules) {
    if(document.location.href.match(rule)) {
        rules[rule]();
    }
}