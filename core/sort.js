function shuffle(a) {
    var _a;
    for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [a[j], a[i]], a[i] = _a[0], a[j] = _a[1];
    }
    return a;
}
function sieve(n) {
    var a = new Array(n);
    for (var i = 2; i < n; i++) {
        a[i] = true;
    }
    for (var i = 2; i < Math.sqrt(n); i++) {
        for (var j = i * i; j < n; j += i) {
            if (a[j]) {
                a[j] = false;
            }
        }
    }
    var b = new Array();
    for (var i = 0; i < n; i++) {
        if (a[i]) {
            b.push(i);
        }
    }
    return b;
}
function heapsort(a) {
    var n = a.length;
    for (var i = Math.floor(n / 2 - 1); i >= 0; i--) {
        heapify(a, n, i);
    }
    for (var i = n - 1; i >= 0; i--) {
        var tmp = a[0];
        a[0] = a[i];
        a[i] = tmp;
        heapify(a, i, 0);
    }
}
function heapify(a, n, i) {
    var hi = i;
    var l = 2 * i + 1;
    var r = 2 * i + 2;
    if (l < n && a[l] > a[hi]) {
        hi = l;
    }
    if (r < n && a[r] > a[hi]) {
        hi = r;
    }
    if (hi != i) {
        var tmp = a[i];
        a[i] = a[hi];
        a[hi] = tmp;
        heapify(a, n, hi);
    }
}
function quicksort(a, lo, hi) {
    if (lo < hi) {
        var p = partition(a, lo, hi);
        quicksort(a, p + 1, hi);
        quicksort(a, lo, p - 1);
    }
}
function partition(a, lo, hi) {
    var pivot = a[hi];
    var i = lo - 1;
    for (var j = lo; j < hi; j++) {
        if (pivot > a[j]) {
            i++;
            var tmp_1 = a[i];
            a[i] = a[j];
            a[j] = tmp_1;
        }
    }
    var tmp = a[i + 1];
    a[i + 1] = a[hi];
    a[hi] = tmp;
    return i + 1;
}
function main() {
    console.log("Hello World!");
    var a = [3217, 187, 7, 17, 17, 196, 8, 9651, 8, 19, -1951, 816, 87, 85, 51, 54, 7, 84, 8, 5, 932, 54];
    console.log(a);
    quicksort(a, 0, a.length - 1);
    console.log(a);
    var b = [3217, 8, 1, 8, 16, 81651, 8, 181, 98, 498, 417, 1, 75, 9, 5, 4, 8, 1, 936, -65, -265, -651, 65];
    console.log(b);
    heapsort(b);
    console.log(b);
    var primes = sieve(99285593);
    primes = shuffle(primes);
    heapsort(primes);
    primes = shuffle(primes);
    quicksort(primes, 0, primes.length - 1);
    console.log(primes[primes.length - 1]);
    console.log(primes);
}
main();
