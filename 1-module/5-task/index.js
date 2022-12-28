function truncate(str, maxlength) {
    if(str.length <= maxlength) {
        return str;
    }
    else {
        let newstr = str.substr(0, maxlength - 1) + '…';
        return newstr;
    }
}

console.log(truncate('a', 1));