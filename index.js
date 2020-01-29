function del(elem) {
    //todo debug
    //elem.parentNode.removeChild(elem);
    elem.style.display = 'none';
}

let href = document.location.href;
function add_observer(element, callback) {
    const observer = new MutationObserver(mutations => {
        if(mutations && document.location.href !== href) {
            href = document.location.href;
            callback();
        }
    });
    observer.observe(element, {childList: true, attributes: true});
}

const rules = {
    'habr.com': function habr_com() {
        //сайдбары
        for (let sidebar of document.getElementsByClassName('sidebar')) {
            del(sidebar);
        }

        //самое читаемое
        del(document.getElementById('broadcast_tabs_posts').parentElement.parentElement);

        //лента
        del(document.querySelector('.posts_list'));
    },
    'vk.com/(im_)?feed': function vk_com() {
        //лента
        del(document.getElementById('main_feed'));

        //реклама
        del(document.getElementById('ads_left'));
    },
    'stackoverflow.com': function () {
        del(document.querySelector('.s-sidebarwidget__yellow'));
        del(document.getElementById('hot-network-questions'));
    }
};


function apply_rules() {
    //execute all matching rules
    for (let rule in rules) {
        if(document.location.href.match(rule)) {
            rules[rule]();
        }
    }
}

apply_rules();

add_observer(document.body, apply_rules);
