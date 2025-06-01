document.addEventListener('DOMContentLoaded', function() {
    const categories = [
        {
            id: 'search-engines',
            links: [
                { name: '百度', url: 'https://www.baidu.com' },
                { name: '谷歌', url: 'https://www.google.com' },
                { name: '搜狗', url: 'https://www.sogou.com' }
            ]
        },
        {
            id: 'social-media',
            links: [
                { name: '微博', url: 'https://weibo.com' },
                { name: '微信', url: 'https://www.wechat.com' },
                { name: 'Facebook', url: 'https://www.facebook.com' }
            ]
        },
        {
            id: 'news',
            links: [
                { name: '百度新闻', url: 'https://news.baidu.com' },
                { name: '新浪网', url: 'https://www.sina.com.cn' },
                { name: '腾讯网', url: 'https://www.qq.com' }
            ]
        },
        {
            id: 'e-commerce',
            links: [
                { name: '淘宝', url: 'https://www.taobao.com' },
                { name: '京东', url: 'https://www.jd.com' },
                { name: '苏宁易购', url: 'https://www.suning.com' }
            ]
        },
        {
            id: 'entertainment',
            links: [
                { name: '腾讯视频', url: 'https://v.qq.com' },
                { name: '爱奇艺', url: 'https://www.iqiyi.com' },
                { name: 'YouTube', url: 'https://www.youtube.com' }
            ]
        },
        {
            id: 'office-software',
            links: [
                { name: 'Microsoft Word', url: 'https://office.live.com/start/Word.aspx' },
                { name: 'Google Docs', url: 'https://docs.google.com/document/' },
                { name: 'WPS Office', url: 'https://wps.com/' }
            ]
        }
    ];

    categories.forEach(category => {
        const section = document.getElementById(category.id);
        const ul = section.querySelector('.links');
        category.links.forEach(link => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = link.url;
            a.textContent = link.name;
            a.target = '_blank';
            li.appendChild(a);
            ul.appendChild(li);
        });
    });
});


