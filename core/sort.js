function shuffle(a) {
    var n = a.length;
    for (var i = n - 1; i >= 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
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
    if (i != hi) {
        var tmp = a[i];
        a[i] = a[hi];
        a[hi] = tmp;
        heapify(a, n, hi);
    }
}
function quicksort(a, lo, hi) {
    if (lo < hi) {
        var p = partition(a, lo, hi);
        quicksort(a, lo, p - 1);
        quicksort(a, p + 1, hi);
    }
}
function partition(a, lo, hi) {
    var i = lo - 1;
    var pivot = a[hi];
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
function main() {
    console.log("Hello World!");
    var a = [21321, 8, 51, 651, 7, 1, 984, 5, 14, 6981, 65, 651, 684, 5, -651, -161, 1, 8];
    console.log(a);
    heapsort(a);
    console.log(a);
    heapsort(a);
    console.log(a);
    var b = [12, 656, 85, 5, 9, 6, 2, 62, 65, 6651, 51, 8, 651, 1, 8, -323, 51, -651];
    console.log(b);
    quicksort(b, 0, b.length - 1);
    console.log(b);
    var primes = sieve(9239800);
    console.log(primes[primes.length - 1]);
    shuffle(primes);
    console.log(primes);
    heapsort(primes);
    console.log(primes);
    shuffle(primes);
    console.log(primes);
    quicksort(primes, 0, primes.length - 1);
    console.log(primes);
}
main();
