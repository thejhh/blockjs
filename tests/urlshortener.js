

function shorturl(url) {
	return url.replace(/^([^:]+:\/\/[^\/]+).*(\/[^\/?]+)(\?.*)?$/, "$1/...$2");
}

console.log(shorturl("www.jhh.me"));
console.log(shorturl("http://www.jhh.me"));
console.log(shorturl("http://www.jhh.me/bar.html"));
console.log(shorturl("http://www.jhh.me/foo/bar.html"));
console.log(shorturl("http://www.jhh.me/foo/bar.html?foo=bar"));
